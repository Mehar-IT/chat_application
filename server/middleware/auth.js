const asyncErrorHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    const error = new Error(`please login to access  this resource`);
    error.status = 400;
    return next(error);
  }

  const decodedData = JWT.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(
        `role ${req.user.role} is not allowed to access this resource`
      );
      error.status = 400;
      return next(error);
    }
    next();
  };
};
