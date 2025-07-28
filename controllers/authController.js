import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SCRET is not defined in .env");
}

// Register a new user
// POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; //deconstruct the req to get these values

    //Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    //Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    //Return user data + token
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login existing user
// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = await req.body;

    //Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    //Check for user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    //Return user data + token
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
