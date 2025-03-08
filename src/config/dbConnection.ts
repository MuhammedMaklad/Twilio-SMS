import mongoose from "mongoose";

const connectionString : string = process.env['MONGODB_URI'] || "";

const connectToDb = async () => {
    try {
        if (!connectionString.length)
            throw new Error("Missing MONGODB_URI environment variable");
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
module.exports = connectToDb