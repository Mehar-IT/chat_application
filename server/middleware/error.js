const notFoundError = (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
};

const errotHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server error";

  if (err.name === "CastError") {
    const error = new Error(`Recource not found. Invalid:${err.path}`);
    error.status = 400;
    err = error;
  }

  if (err.code === 11000) {
    const error = new Error(`dublicate ${Object.keys(err.keyValue)} entered`);
    error.status = 400;
    err = error;
  }
  if (err.name === "JsonWebTokenError") {
    const error = new Error(`Json web token is invalid, try again`);
    error.status = 400;
    err = error;
  }

  if (err.name === "TokenExpiredError") {
    const error = new Error(`Json web token is invalid, try again`);
    error.status = 400;
    err = error;
  }

  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};

module.exports = { notFoundError, errotHandler };
