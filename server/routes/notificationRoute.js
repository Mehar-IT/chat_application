const express = require("express");
const router = express.Router();
const {
  sendMotification,
  allNotification,
  deleteNotification
} = require("../controllers/notificationController");
const { isAuthenticated } = require("../middleware/auth");

router.route("/").post(isAuthenticated, sendMotification).get(isAuthenticated, allNotification);
router.route("/:id").delete(isAuthenticated,deleteNotification );

module.exports = router;
