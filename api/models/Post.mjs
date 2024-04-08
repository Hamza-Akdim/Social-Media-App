import mongoose from "mongoose";
import Joi from "joi";
import { User } from "./User.mjs";


// Create Post Schema
const PostSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectID,
		ref : User,  // model reference
        required : true,
    },
    firstName : {
        type : String,
        required : true,
        trim : true ,
        minlength : 2,
        maxlength : 200,
    },
    lastName : {
        type : String,
        required : true,
        trim : true ,
        minlength : 2,
        maxlength : 200,
    },
    description : {
        type : String,
        default : ""
    },
},
{
    timestamps : true,
})

// Create Post Model
const User =  mongoose.model("User",PostSchema);

// Validation Add Post
function addPost(obj){
    const schema = Joi.object({
        firstName : Joi.string().trim().required().min(2).max(200),
        lastName : Joi.string().trim().required().min(2).max(200),
        description : Joi.string().required(),
    });
    return schema.validate(obj);
}

export {
    addPost,

}