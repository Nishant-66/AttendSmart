import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import './services/notificationService.js';
import { connectDB } from "./config/dbConfig.js"; 
// Load environment variables from .env file
dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); 
app.use(cookieParser()); // Parses cookies from incoming requests

import authRoutes from './routes/auth.routes.js';
import classRoutes from './routes/class.route.js';
import attendRoutes from './routes/attend.routes.js';

app.use('/auth', authRoutes);   
app.use('/classes', classRoutes); 
app.use('/attendance', attendRoutes); 



app.listen(PORT, () => {
	connectDB(); // Connect to MongoDB
	console.log(`Server Running on port ${PORT}`); // Log server start
});
