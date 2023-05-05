import UserB from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUserB = new UserB({
    username,
    email,
    password: await UserB.encryptPassword(password),
  });

  if (roles) {
    const foundRole = await Role.find({ name: { $in: roles } });
    newUserB.roles = foundRole.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "editor" });
    newUserB.roles = [role._id];
  }

  const savedUser = await newUserB.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserB.findOne({ email: email }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPasword = await UserB.comparePassword(
    password,
    userFound.password
  );

  if (!matchPasword)
    return res.status(400).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
