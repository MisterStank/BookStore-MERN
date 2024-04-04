import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT
//import { PORT, mongoDBURL, JWT_SECRET } from "./config.js";
import User from "./models/userModel.js"; // Assuming you have a UserModel
import cors from "cors";
import 'dotenv/config'

const app = express();

const secret = process.env.JWT_SECRET;

// Middleware for parsing request body
app.use(express.json());
app.use(cors({
  origin: ["https://m-book-store.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
}));

// Registration route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("authHeader:", authHeader);
    
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token:", token);
  
    if (token == null) {
      console.log("Token is null or undefined");
      return res.sendStatus(401); // if there isn't any token
    }
  
    try {
      const user = jwt.verify(token, secret);
      req.user = user;
      console.log("user:", user);
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.sendStatus(403);
    }
  };
  

app.get("/api/users", authenticateToken, async (req, res) => {
    try {
      // Get the users from MongoDB
      const users = await User.find({}, { _id: 0 }); // Excluding _id field, including email field
  
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

mongoose
  .connect(process.env.mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
