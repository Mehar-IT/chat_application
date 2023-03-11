const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwtToken = require("../utils/jwtToken");

module.exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "random url",
      image_url:
        "https://res.cloudinary.com/learn2code/image/upload/v1663160482/aqgztfqitit4okoxmrug.png",
    },
  });
  jwtToken(user, 201, res);
});

module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email and password", 401);
    return next(error);
  }
  const isPasswordMatch = await user.comparePassowrd(password);

  if (!isPasswordMatch) {
    const error = new Error("Invalid email and password");
    error.status = 401;
    return next(error);
  }
  jwtToken(user, 201, res);
});
