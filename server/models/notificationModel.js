const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    // reciver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Notification", notificationModel);
