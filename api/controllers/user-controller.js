const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/user.js");
const mongoose = require("mongoose");
const fs = require('fs');


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

  var Data = user.profilePicture.data
  var ContentType = user.profilePicture.contentType
  
  if (req.file){
    var Data, ContentType;
    try {
      Data = await fs.promises.readFile(req.file.path);
      ContentType = req.file.mimetype;
      req.file = req.file.path; 
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error reading image file');
    }
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set : {
          email : req.body.email,
          password : req.body.password,
          lastName : req.body.lastName,
          firstName : req.body.firstName,
          profilePicture : { 
            data : Data, 
            contentType : ContentType,
          },
          friends : req.body.friends,
          dateOfBirth : req.body.dateOfBirth,
          bioContent : req.body.bioContent,
          location : req.body.location,
          occupation : req.body.occupation,
      }
  },{new : true}).select("-password -backgroundPicture -profilePicture")
  res.status(200).json(updateUser);
  } 
)

/** 
 * @desc    Update user's Background
 * @route   /api/users/:id/backgroundPicture
 * @method  PUT
 * @access  Private
 */
const updateUserBackgroundByID = asyncHandler( async (req,res) => {
  const user = await User.findById(req.params.id)
  if (!user){
    res.status(404).json({message : "user Not Found"})
  }

  const {error} = validateUpdateUser(req.body);
  if (error){
      res.status(400).json({message : error.details[0].message});
  }

  var Data = user.backgroundPicture.data
  var ContentType = user.backgroundPicture.contentType
  
  if (req.file){
    var Data, ContentType;
    try {
      Data = await fs.promises.readFile(req.file.path);
      ContentType = req.file.mimetype;
      req.file = req.file.path; 
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error reading Background image file');
    }
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set : {
          backgroundPicture : { 
            data : Data, 
            contentType : ContentType,
          },
      }
  },{new : true}).select("-password -backgroundPicture -profilePicture")
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
  const users = await User.find().select("-password -backgroundPicture -profilePicture")
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
  const user = await User.findById(req.params.id).select("-password -backgroundPicture -profilePicture").populate("friends",["_id" ,"firstName" ,"lastName","email"])
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
  const user = await User.findById(req.params.id).select("-password -backgroundPicture -profilePicture")
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
  const user = await User.findById(req.params.id).select("-password -backgroundPicture -profilePicture").populate("friends",["_id" ,"email"])
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
      res.status(200).json({message : `${friend.firstName} ${friend.lastName} has been removed from your frind list`})
    } else {
      user.friends.push(friendObjectId);
      friend.friends.push(user._id);
      await user.save();
      await friend.save();
      res.status(200).json({message : `${friend.firstName} ${friend.lastName} has been adedd to your frind list`})
    }

  } else (
    res.status(404).json({message : "user Not Found"})
  )

})

module.exports = { 
  updateUserByID, 
  getAllUsers, 
  getUserByID, 
  getUserFriendsByID,
  deleteUserByID,
  addRemoveFriend,
  updateUserBackgroundByID
}
