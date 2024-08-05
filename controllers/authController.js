const {
  registerUser,
  loginUser,
  changeRole,
  getUserByToken,
} = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await changeRole(req.body);
    res.status(200).json({ role });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserByToken(req);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  updateRole,
  getUser,
};
