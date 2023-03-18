const express = require("express");
const router = express.Router();
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
const { isAuthenticated } = require("../middleware/auth");

router.route("/").post(isAuthenticated, sendMessage);
router.route("/:chatId").get(isAuthenticated, allMessages);

module.exports = router;
