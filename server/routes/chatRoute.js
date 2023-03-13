const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");
const { authorizeRole, isAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .post(isAuthenticated, accessChat)
  .get(isAuthenticated, fetchChat);
router.route("/group").post(isAuthenticated, createGroupChat);
router.route("/rename").put(isAuthenticated, renameGroup);
router.route("/groupremove").put(isAuthenticated, removeFromGroup);
router.route("/groupadd").put(isAuthenticated, addToGroup);

module.exports = router;
