const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const { notFoundError, errotHandler } = require("./utils/error");

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`shuting down server due to uncaught Exception`);
  process.exit(1);
});

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "app is running",
  });
});

app.use("/api/user", userRoute);

app.use(notFoundError);
app.use(errotHandler);

app.listen(PORT, () => {
  console.log(`App is listinig on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`shuting down server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
