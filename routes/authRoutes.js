const express = require("express");
const { register, login, updateRole, getUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-role", updateRole);
router.get("/me", getUser);
module.exports = router;