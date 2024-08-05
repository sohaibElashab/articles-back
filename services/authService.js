const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (userData) => {
  const { name, password } = userData;
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const user = new User({ name, password });
  await user.save();
  return { user, token: generateToken(user._id) };
};

const loginUser = async (userData) => {
  const { name, password } = userData;
  const user = await User.findOne({ name });
  if (user && (await user.matchPassword(password))) {
    return { user, token: generateToken(user._id) };
  } else {
    throw new Error("Invalid credentials");
  }
};
const changeRole = async (req, res) => {
  const { userId, newRole } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.role = newRole;
    await user.save();
    return user.role;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  changeRole,
  getUserByToken,
};
