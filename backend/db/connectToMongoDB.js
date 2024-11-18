import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI); // No extra options needed
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message, error.stack);
  }
};

export default connectToMongoDB;
