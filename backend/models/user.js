const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Customer",
  },
  age: {
    type: Number,
    required: true,
  },
  favouriteTools: [
    {
      type: String,
      ref: "AITools",
    },
  ],
  registration_date: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  tokens: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
