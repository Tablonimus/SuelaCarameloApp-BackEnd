import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, role });
    res.json({ id: user._id, username: user.username, role: user.role, createdAt: user.createdAt });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true, select: "-password" }
    );
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};
