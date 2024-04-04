import mongoose from "mongoose";
import 'dotenv/config';

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI) // return a promise succes OR error, process is from nodejs
        console.log("Connected to mongodb...")
    } catch (error) {
        console.log("Connection failed to mongodb!", error)
    }
}

export default connectToDB ;