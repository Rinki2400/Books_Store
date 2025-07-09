
const express = require("express");
const router = express.Router();
const User = require('../model/userModel')

// Sign Up
router.post("/", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //check username length more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greather than 3" });
    }
    // check  username already exits ?
    const existingusername = await User.find({ username: username });
    if (existingusername) {
      return res.status(400).json({ message: "Username already exist.." });
    }
    // check  username already exits ?
    const existingemail = await User.find({ email: email });
    if (existingemail) {
      return res.status(400).json({ message: "Username already exist.." });
    }

    //  check password length
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length  should be greather than 3" });
    }
    const newUser = new User({username:username,email,password,address});
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.." });
  }
});

module.exports = router;
