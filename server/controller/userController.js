const userdetail = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "yourSecretKey";

// SIGNUP
const signup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUsername = await userdetail.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await userdetail.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password should be greater than 5 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userdetail({
      username,
      email,
      password: hashedPassword,
      address,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// SIGNIN
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await userdetail.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
        role: existingUser.role,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        address: existingUser.address,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("Signin error:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getUser = async (req,res) =>{
try {
    const users = await userdetail.find().select("-password");
     res.status(200).json(users);
} catch (error) {
    console.error("Signin error:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
}
};
const getUserById = async (req,res) => {
  try {
    const userId = req.params.id;
    const users = await userdetail.findById(userId).select("-password");
     res.status(200).json(users);
  } catch (error) {
    console.error("Signin error:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
}
  }


module.exports = { signup, signin ,getUser,getUserById};
