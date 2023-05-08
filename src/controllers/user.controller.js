import UserB from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {
  const { username, email, password, roles } = req.body;
  try {
    const userFound = await UserB.findOne({ email: email });

    if (userFound) return res.status(400).json({ message: "That email exist" });

    const rolesFound = await Role.find({ name: { $in: roles } });

    const user = new UserB({
      username,
      email,
      password: await UserB.encryptPassword(password),
      roles: rolesFound.map((role) => role._id),
    });

    await user.save();

    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await UserB.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await UserB.findById(id);
    res.status(200).json(userFound);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, roles } = req.body;
  try {
    const foundRole = await Role.find({ name: { $in: roles } });
    const userModifided = {
      username,
      email,
      password: await UserB.encryptPassword(password),
      roles: foundRole.map((role) => role._id),
    };
    const userUpdate = await UserB.findByIdAndUpdate(id, userModifided);
    res.status(200).json({ message: `user ${userUpdate.username} updated` });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await UserB.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log(error);
  }
};
