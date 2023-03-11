const notFoundError = (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
};

const errotHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server error";

  if (err.code == "11000") {
    const error = new Error(`dublicate ${Object.keys(err.keyValue)} entered`);
    error.status = 400;
    err = error;
  }

  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};

module.exports = { notFoundError, errotHandler };
