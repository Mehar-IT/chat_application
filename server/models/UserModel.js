const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: { type: String, require: true },
    avatar: {
      public_id: {
        type: String,
        require: true,
      },
      image_url: {
        type: String,
        require: true,
      },
    },
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassowrd = function (password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
