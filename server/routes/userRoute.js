const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
  logoutUser,
} = require("../controllers/userController");
const { authorizeRole, isAuthenticated } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUsers").get(isAuthenticated, allUsers);
router.route("/logout").get(logoutUser);

module.exports = router;
