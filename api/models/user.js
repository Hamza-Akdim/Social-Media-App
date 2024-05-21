const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const fs = require('fs');
require("dotenv").config();


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
  profilePicture: {
    data: {
      type : Buffer, // Binary data of the image
    },
    contentType: {
      type : String,
      default : "" ,
    } // MIME type of the image (e.g., image/jpeg, image/png)
  },
  backgroundPicture: {
    data: {
      type : Buffer, // Binary data of the image
    },
    contentType: {
      type : String,
      default : "" ,
    } // MIME type of the image (e.g., image/jpeg, image/png)
  },
  friends : {
    type : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    default : [],
  },
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

// Create User Model
const User =  mongoose.model("User",userSchema);


// Validation register User
function validateRegisterUser(obj){
  const schema = Joi.object({
      email : Joi.string().trim().required().min(5).max(100).email(),
      firstName : Joi.string().trim().required().min(2).max(200),
      lastName : Joi.string().trim().required().min(2).max(200),
      password : passwordComplexity().required(),
      profilePicture : Joi.object({
        data: Joi.binary(),
        contentType: Joi.string().default(""),
      }).optional().default(),
      backgroundPicture : Joi.object({
        data: Joi.binary(),
        contentType: Joi.string().default(""),
      }).optional().default(),
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
    profilePicture : Joi.object({
      data: Joi.binary(),
      contentType: Joi.string().default(""),
    }).optional().default(),
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

module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
  validateUpdatePassword,
}
