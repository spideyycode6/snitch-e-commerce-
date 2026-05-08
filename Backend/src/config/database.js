import { config } from "./config.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(config.mongoURI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
}

export default connectDB;