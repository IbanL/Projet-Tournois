import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connecté: ${conn.connection.host}`);
    } catch (error) {
        console.log("erreur de connection a la DB",error);
    }
};

export default connectDB;