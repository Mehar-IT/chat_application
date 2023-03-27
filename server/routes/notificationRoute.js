const express = require("express");
const router = express.Router();
const {
  sendMotification,
  allNotification,
  deleteNotification,
  deleteNotificationByChat
} = require("../controllers/notificationController");
const { isAuthenticated } = require("../middleware/auth");

router.route("/").post(isAuthenticated, sendMotification).get(isAuthenticated, allNotification);
router.route("/:id").delete(isAuthenticated,deleteNotification );
router.route("/bychatid/:chatId").delete(isAuthenticated,deleteNotificationByChat );

module.exports = router;
