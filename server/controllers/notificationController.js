const Chat = require("../models/chatModel");
const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

module.exports.sendMotification = asyncHandler(async (req, res, next) => {
  const { messageId } = req.body;

  if (!messageId) {
    const error = new Error("Invalid data passed into request");
    error.status = 400;
    return next(error);
  }

  var newNotification = {
    reciver: req.user.id,
    notification: messageId,
  };

  try {
    var notification = await Notification.create(newNotification);

    notification = await notification.populate("reciver", "name email");
    notification = await notification.populate("notification");

    notification = await User.populate(notification, {
      path: "notification.sender",
      select: "name email",
    });
    notification = await Chat.populate(notification, {
      path: "notification.chat",
      select: "users",
    });
    notification = await User.populate(notification, {
      path: "notification.chat.users",
      select: "name email",
    });

    res.status(200).json(notification);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
});

module.exports.allNotification = asyncHandler(async (req, res, next) => {
  try {
    // const messages = await Notification.find({ reciver: req.params.userId })
    const messages = await Notification.find({ reciver: req.user._id })
      .populate("reciver", "name email")
      .populate("notification");

    res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
});

// module.exports.getNotification = asyncHandler(async (req, res, next) => {
//   try {
//     const messages = await Notification.find({ chat: req.params.chatId })
//       .populate("sender", "name avatar email")
//       .populate("chat");

//     res.status(200).json(messages);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    const error = new Error("notification not found");
    error.status = 404;
    return next(error);
  }

  // await notification.remove();

  res.status(200).json({ success: true });
});
