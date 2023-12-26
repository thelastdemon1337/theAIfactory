const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/nodemailer");
const sendOTP = require("../utils/otpVerification.js");
const jwt = require("jsonwebtoken");

const otpMap = new Map();

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  // Confirm data
  if (!email) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  // Find users from MongoDB
  const user = await User.find({ email: email });

  // If no users
  if (!user?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(user);
};

const otpValidate = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Get OTP from cache using user's ID
    const cachedOTP = otpMap.get(user._id.toString());
    console.log(`cachedOTP : ${cachedOTP}`);

    if (!cachedOTP || otp !== cachedOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    if (password) {
      const hashedPwd = await bcrypt.hash(password, 10);
      user.password = hashedPwd;
      await user.save();
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .send({ message: "Password reset successful", email: user.email });
    }
    // Mark the user as verified (you can add a verified field to your User model)
    user.isVerified = true;
    await user.save();
    setTimeout(() => {
      otpMap.delete(user._id.toString());
    }, 600000);

    const subject = "Welcome to TheAIFactory";
    const text = "Get awesome deals on AI";

    sendEmail(email, subject, text);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send({ message: "OTP validation successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      const otp = await sendOTP(
        email,
        "Reset Password",
        "To reset your password for the account please enter the OTP in our site"
      );
      otpMap.set(user._id.toString(), otp);
      console.log(otpMap);
      console.log(otp);

      res.status(200).json({
        message: `Email sent to ${email}, Please check your email`,
      });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = async (req, res) => {
  const { fullname, password, email, age } = req.body;
  console.log(req.body);
  // Confirm data
  if (!fullname || !password || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: hashedPwd,
    age: req.body.age,
  });

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    const otp = await sendOTP(
      email,
      "Verify Email",
      "To verify your account please enter the OTP in our site"
    );
    otpMap.set(user._id.toString(), otp);
    console.log(otpMap);
    console.log(otp);

    res.status(201).json({
      message: `New user ${fullname} created, Please veify your email`,
    });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, fullname, email, favouriteTools, age, password } = req.body;
  console.log(req.body)
  // Confirm data
  if (!id || !fullname || !email || !favouriteTools || !age) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.fullname = fullname;
  user.email = email;
  user.favouriteTools = favouriteTools;
  user.age = age;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json(updatedUser);
};

// @desc Delete a user
// @route DELETE /users
// @access Private
// const deleteUser = async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// }

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  getUserByEmail,
  otpValidate,
  resetPassword,
  // updateUser,
  // deleteUser
};
