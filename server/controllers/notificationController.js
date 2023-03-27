const Chat = require("../models/chatModel");
const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

module.exports.sendMotification = asyncHandler(async (req, res, next) => {
  // const { messageId,userId } = req.body;
  const { messageId } = req.body;

  if (!messageId) {
    const error = new Error("Invalid data passed into request");
    error.status = 400;
    return next(error);
  }

  var newNotification = {
    // reciver: req.user._id,
    // reciver: userId,
    notification: messageId,
  };

  try {
    var notification = await Notification.create(newNotification);

    // notification = await notification.populate("reciver", "name email");
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
  Notification.find()
    .populate({
      path: "notification",
      populate: {
        path: "sender",
        select: "name email",
        match: { _id: { $ne: req.user._id } },
      },
    })
    .then(async (notification) => {
      notification = notification.filter((item, index) => {
    
        
        // var list=[]

        // if(item[index]===item[index+1]){
        //   list.push(list)
        
        // }
        if (item.notification !== null && item.notification.sender !== null) {
          return item;
        }
      });

      try {
        notification = await User.populate(notification, {
          path: "notification.sender",
          select: "name email",
        });

        notification = await User.populate(notification, {
          path: "notification.chat",
          select: "users chatName isGroupChat latestMessage",
          match: {
            users: { $elemMatch: { $eq: req.user._id } },
          },
        });

        notification = notification.filter((item, index) => {
          if (item.notification.chat !== null) {
            return item;
          }
        });

        notification = await Chat.populate(notification, {
          path: "notification.chat.latestMessage",
          select: "chat content sender",
        });

        notification = await Chat.populate(notification, {
          path: "notification.chat.latestMessage.sender",
          select: "avatar email name",
        });
        notification = await User.populate(notification, {
          path: "notification.chat.users",
          select: "name email avatar",
        });

        res.status(200).json(notification);
      } catch (error) {
        return next(error);
      }
    })
    .catch((e) => {
      return next(e);
    });
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

  res.status(200).json({ success: true });
});

module.exports.deleteNotificationByChat = asyncHandler(
  async (req, res, next) => {
    console.log(req.params.chatId);

    // var notification = await
    Notification.find()
      .populate({
        path: "notification",
        populate: {
          path: "chat",
          match: { _id: req.params.chatId },
        },
      })
      .then(async (notification) => {
        notification = notification.filter((item, index) => {
          if (item.notification.chat !== null) {
            return item;
          }
        });

        var notificationIds = notification.map((n) => n._id);

        await Notification.deleteMany({
          _id: { $in: notificationIds },
        });
        res.status(200).json({ success: true });
      });
  }
);
