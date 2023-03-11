const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/dummyData");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "app is running",
  });
});

app.get("/api/chats", (req, res, next) => {
  res.status(200).json({
    success: true,
    chats,
  });
});

app.get("/api/chats/:chatId", (req, res, next) => {
  const id = req.params.chatId;

  const chatData = chats.find((e) => e._id === id);

  res.status(200).json({
    success: true,
    chatData,
  });
});

app.listen(PORT, () => {
  console.log(`App is listinig on ${PORT}`);
});
