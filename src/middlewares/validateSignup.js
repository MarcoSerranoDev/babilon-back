import UserB from "../models/User";

export const checkExistingUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const userFound = await UserB.findOne({ username });
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const emailFound = await UserB.findOne({ email });
    if (emailFound)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
