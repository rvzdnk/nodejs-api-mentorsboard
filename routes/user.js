const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const {
    validateRegistration,
    validateLogin,
} = require("../middlewares/userValidation");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", authenticateUser, logoutUser);

module.exports = router;