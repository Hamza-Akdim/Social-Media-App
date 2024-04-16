const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI) // return a promise succes OR error, process is from nodejs
        console.log("Connected to mongodb...")
    } catch (error) {
        console.log("Connection failed to mongodb!", error)
    }
}

module.exports = connectToDB ;