const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please add lastname"],
    },
    phone: {
      type: String,
      required: [true, "Please add your phone number"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: "String",
      required: [true, "Please add your password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
