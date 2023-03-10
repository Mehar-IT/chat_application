const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "app is running",
  });
});

app.listen(PORT, () => {
  console.log(`App is listinig on ${PORT}`);
});
