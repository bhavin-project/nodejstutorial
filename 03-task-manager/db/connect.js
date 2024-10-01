import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGOURI;
export const connectDB = async () => {
  // return mongoose.connect(url, {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error; // Rethrow the error for handling in caller
  }
};

// module.exports = connectDB;
