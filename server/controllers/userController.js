const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");

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
  sendToken(user, 201, res);
});

module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email and password");
    error.status = 401;
    return next(error);
  }
  const isPasswordMatch = await user.comparePassowrd(password);

  if (!isPasswordMatch) {
    const error = new Error("Invalid email and password");
    error.status = 401;
    return next(error);
  }
  sendToken(user, 201, res);
});

module.exports.logoutUser = asyncHandler(async (req, res, next) => {
  const option = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, option);
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

module.exports.allUsers = asyncHandler(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    user,
  });
});
