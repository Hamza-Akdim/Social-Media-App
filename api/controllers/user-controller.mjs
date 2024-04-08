import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, validateUpdateUser } from "../models/User.mjs";
import mongoose from "mongoose";


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
  const imgPath = req.file ? req.file.path : null;
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set : {
          email : req.body.email,
          password : req.body.password,
          lastName : req.body.lastName,
          firstName : req.body.firstName,
          picturePath : imgPath,
          friends : req.body.friends,
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
  const user = await User.findById(req.params.id).select("-password").populate("friends",["_id" ,"email"])
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

/** 
 * @desc    Get User friends by id
 * @route   /api/users/:id/friends
 * @method  GET
 * @access  Private (only admin & user himself)
 */
const getUserFriendsByID = asyncHandler( async (req,res) => {
  const user = await User.findById(req.params.id).select("-password").populate("friends",["_id" ,"email"])
  if (user.friends){
      res.status(200).json(user.friends)
  } else (
      res.status(404).json({message : "user Not Found"})
  )
})

/** 
 * @desc    Add or remove User's friend by Id
 * @route   /api/users/:id/:friendId
 * @method  POST
 * @access  Private (only admin & user himself)
 */
const addRemoveFriend = asyncHandler( async (req,res) => {
  const { id, friendId } = req.params;
  const user = await User.findById(id)
  const friend = await User.findById(friendId)

  if (user && friend){
    const friendObjectId = new mongoose.Types.ObjectId(friendId);
    if (user.friends.includes(friendObjectId)) {
      user.friends = user.friends.filter((id) => id.toString() !== friendObjectId.toString());
      friend.friends = friend.friends.filter((id) => id !== user._id.toString());
      await user.save();
      await friend.save();
      res.status(200).json({message : `${friend.firstName} has been removed from your frind list`})
    } else {
      user.friends.push(friendObjectId);
      friend.friends.push(user._id);
      await user.save();
      await friend.save();
      res.status(200).json({message : `${friend.firstName} has been adedd to your frind list`})
    }

  } else (
    res.status(404).json({message : "user Not Found"})
  )

})

export { 
  updateUserByID, 
  getAllUsers, 
  getUserByID, 
  getUserFriendsByID,
  deleteUserByID,
  addRemoveFriend,
}
