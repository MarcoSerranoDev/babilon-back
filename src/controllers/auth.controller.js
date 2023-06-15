import User from "../models/User";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await UserB.encryptPassword(password),
  });

  if (roles) {
    const foundRole = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRole.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "editor" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email: email }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPasword = await User.comparePassword(password, userFound.password);

  if (!matchPasword)
    return res.status(400).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, SECRET, {
    expiresIn: 86400,
  });

  res.cookie("token", token);

  res.json({
    username: userFound.username,
    email: userFound.email,
    roles: userFound.roles.map((rol) => rol.name),
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.send(false);

  jwt.verify(token, SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id).populate("roles");
    if (!userFound) return res.sendStatus(401);

    return res.json({
      username: userFound.username,
      email: userFound.email,
      roles: userFound.roles.map((rol) => rol.name),
    });
  });
};
