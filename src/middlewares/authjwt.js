import jwt from "jsonwebtoken";
import config from "../config";
import UserB from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "no token provided" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await UserB.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isEditor = async (req, res, next) => {
  const { userId } = req;
  const user = await UserB.findById(userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "editor" || roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ messge: "Require EDITOR or ADMIN role" });
};

export const isAdmin = async (req, res, next) => {
  const { userId } = req;
  const user = await UserB.findById(userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ messge: "Require ADMIN role" });
};