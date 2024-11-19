import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies before routes
app.use(express.json()); 
app.use(cookieParser()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB(); // Call MongoDB connection after server starts
});
