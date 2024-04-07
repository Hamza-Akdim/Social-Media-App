import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, validateUpdateUser } from "../models/User.mjs";


/** 
 * @desc    Update User
 * @route   /api/users/:id
 * @method  PUT
 * @access  Private
 */
const updateUserByID = asyncHandler( async (req,res) => {
  const user = await User.findById(req.params.id)
  if (!user){
    res.status(404).json({message : "user Not Found"})
  } 

  const {error} = validateUpdateUser(req.body);
  if (error){
      res.status(400).json({message : error.details[0].message});
  }

  if (req.body.password){
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash( req.body.password, salt );
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set : {
          email : req.body.email,
          password : req.body.password,
          lastName : req.body.lastName,
          firstName : req.body.firstName,
          dateOfBirth : req.body.dateOfBirth,
          bioContent : req.body.bioContent,
          location : req.body.location,
          occupation : req.body.occupation,
      }
  },{new : true}).select("-password")
  res.status(200).json(updateUser);
  } 
)

/** 
 * @desc    Get all Users
 * @route   /api/users
 * @method  GET
 * @access  Private (only admin)
 */
const getAllUsers = asyncHandler( async (req,res) => {
  const users = await User.find().select("-password")
  res.status(200).json(users);
  }
)

/** 
 * @desc    Get Users by id
 * @route   /api/users/:id
 * @method  GET
 * @access  Private (only admin & user himself)
 */
const getUserByID = asyncHandler( async (req,res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user){
      res.status(200).json(user)
  } else (
      res.status(404).json({message : "user Not Found"})
  )
} )

/** 
 * @desc    Delete Users by id
 * @route   /api/users/:id
 * @method  Delete
 * @access  Private (only admin & user himself)
 */
const deleteUserByID = asyncHandler( async (req,res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user){
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({message:"User has been Deleted"})
  } else (
      res.status(404).json({message : "user Not Found"})
  )
} )

export { 
  updateUserByID, 
  getAllUsers, 
  getUserByID, 
  deleteUserByID
}
