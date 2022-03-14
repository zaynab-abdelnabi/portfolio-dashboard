const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Please add a password"],
    },
  },
  { collection: "users" }
);

const User = model("User", UserSchema);

module.exports = User;
