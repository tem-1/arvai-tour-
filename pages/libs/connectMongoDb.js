import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB.");
            return mongoose.connection;
        }
        const connection = await mongoose.connect(process.env.MONGODB);
        console.log("Connected to MongoDB.");
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
};
