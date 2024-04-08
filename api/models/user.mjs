import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";

// Create User Schema
const userSchema = new mongoose.Schema({
  email: 
  { 
    type: String, 
    required: true, 
    unique: true ,
    trim : true,
    minlength : 5,
    maxlength : 100
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
  password: 
  { 
    type: String, 
    required: true, 
    trim : true ,
    minlength: 6 
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends : {
    type : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    default : [],
  } ,
  dateOfBirth : {
    type : String,
    required : true,
  },
  bioContent : {
    type : String,
    default : "" 
  },
  location : {
    type : String,
    default : ""
  },
  occupation : {
    type : String,
    default : ""
  },
  isAdmin : {
    type : Boolean,
    default : false
  },
},
{
  timestamps : true,
});

// Generate Token 
function generateToken(){
  return jwt.sign({ id:this._id, isAdmin:this.isAdmin}, process.env.JWT_SECRET_KEY, {expiresIn:"2h"});
};
userSchema.methods.generateToken = generateToken;

// Create User Model
const User =  mongoose.model("User",userSchema);

// Validation register User
function validateRegisterUser(obj){
  const schema = Joi.object({
      email : Joi.string().trim().required().min(5).max(100).email(),
      firstName : Joi.string().trim().required().min(2).max(200),
      lastName : Joi.string().trim().required().min(2).max(200),
      password : passwordComplexity().required(),
      picturePath : Joi.string().default(""),
      friends : Joi.array().default([]),
      isAdmin: Joi.boolean().default(false),
      dateOfBirth : Joi.string().required(),
      bioContent : Joi.string().default(""),
      location : Joi.string().default(""),
      occupation : Joi.string().default(""),
  });
  return schema.validate(obj);
}
// Validation Login User
function validateLoginUser(obj){
  const schema = Joi.object({
      email : Joi.string().trim().required().min(5).max(100).email(),
      password : passwordComplexity().required(),
  });
  return schema.validate(obj);
}

// Validation Update User
function validateUpdateUser(obj){
  const schema = Joi.object({
    email : Joi.string().trim().min(5).max(100).email(),
    firstName : Joi.string().trim().min(2).max(200),
    lastName : Joi.string().trim().min(2).max(200),
    password : passwordComplexity,
    picturePath : Joi.string().default(""),
    friends : Joi.array().default([]),
    dateOfBirth : Joi.date(),
    bioContent : Joi.string().default(""),
    location : Joi.string().default(""),
    occupation : Joi.string().default(""),
  });
  return schema.validate(obj);
}

// Validation Update password
function validateUpdatePassword(obj){
  const schema = Joi.object({
    password : passwordComplexity(),
  });
  return schema.validate(obj);
}

export {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
  validateUpdatePassword,
  generateToken
}
