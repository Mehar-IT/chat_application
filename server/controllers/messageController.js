const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

module.exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    const error = new Error("Invalid data passed into request");
    error.status = 400;
    return next(error);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.status(200).json(message);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
});

module.exports.allMessages = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
});
