import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/dbConfig.js"; 
// Load environment variables from .env file
dotenv.config();

const app = express(); 

// Port assignment with fallback to 5000 if PORT environment variable is not set
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Parses incoming JSON payloads from requests
app.use(cookieParser()); // Parses cookies from incoming requests

// Start the server and connect to MongoDB
app.listen(PORT, () => {
	connectDB(); // Connect to MongoDB
	console.log(`Server Running on port ${PORT}`); // Log server start
});
