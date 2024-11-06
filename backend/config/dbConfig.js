import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Retrieve the URI from environment variables
    if (!uri) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('DB Connection Error:', error);
    process.exit(1); // Exit process with failure
  }
};
