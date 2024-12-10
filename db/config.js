import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.DB_URL;

async function dbConnection() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Database connection activated");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnection;
