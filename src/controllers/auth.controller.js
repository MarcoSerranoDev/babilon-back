import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import { SECRET, SECRET_REF } from "../config";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
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

  const refresh = jwt.sign({ id: userFound._id }, SECRET_REF, {
    expiresIn: "1d",
  });

  userFound.refreshToken = refresh;
  userFound.accessToken = token;

  const result = await userFound.save();

  res.cookie("token", refresh, {
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    username: result.username,
    email: result.email,
    roles: userFound.roles.map((rol) => rol.name),
    accessToken: token,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.send(false);

  jwt.verify(token, SECRET_REF, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id).populate("roles");
    if (!userFound) return res.sendStatus(401);

    return res.json({
      username: userFound.username,
      email: userFound.email,
      roles: userFound.roles.map((rol) => rol.name),
      accessToken: userFound.accessToken,
    });
  });
};

export const logout = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(204).json({ message: "No content" });

  const userFound = await User.findOne({ refreshToken: token }).exec();

  if (!userFound) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.status(204);
  }

  userFound.refreshToken = "";
  userFound.accessToken = "";
  await userFound.save();

  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  return res.status(204).json("logout user");
};

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401);

  const refreshToken = cookies.token;

  const userFound = await User.findOne({ refreshToken });

  if (!userFound) return res.status(403);

  jwt.verify(refreshToken, SECRET_REF, async (err, decoded) => {
    if (err || userFound._id !== decoded.id) return res.status(403);
    const newAccessToken = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400,
    });
    userFound.accessToken = newAccessToken;
    await userFound.save();
    res.json({ newAccessToken });
  });
};
