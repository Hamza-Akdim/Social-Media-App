import asyncHandler from "express-async-handler";
import {addPostValidation, Post, updatePostValidation} from "../models/Post.mjs"
import mongoose from "mongoose";
import { User } from "../models/User.mjs";


/** 
 * @desc    Get all Posts
 * @route   /api/posts
 * @method  GET
 * @access  Public
 */
const getFeedPosts = asyncHandler( async (req,res) => {
    const posts = await Post.find().populate("userId",["_id" ,"lastName"])
    res.status(200).json(posts);
    }
)

/** 
 * @desc    Get post by usersId
 * @route   /api/posts/:userId
 * @method  GET
 * @access  Private (only admin & user himself)
 */
const getUserPosts = asyncHandler( async (req,res) => {
    const userId = req.params.userId;
    const post = await Post.find({userId}).populate("userId",["_id" ,"lastName"])
    if (post){
        res.status(200).json(post)
    } else (
        res.status(404).json({message : "Post Not Found"})
    )
} )

/** 
 * @desc    Creat new Post
 * @route   /api/posts/
 * @method  POST
 * @access  Private (only admin & user himself)
 */
const addPost = asyncHandler( async (req,res) => {
    const {error} = addPostValidation(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let user = await User.findById(req.body.userId);
    if (!user){
        return res.status(404).json({ message : "user not found"});
    }

    const imgPath = req.file ? req.file.path : "";
    const post = new Post ({
        userId : req.body.userId,
        description : req.body.description,
        picturePath : imgPath,
        likes: {},
    });
    const result = await post.save();
    res.status(201).json(result);
    }
)

/** 
 * @desc    like post by its id
 * @route   /api/posts/:postId/:userId
 * @method  PATCH
 * @access  Private (only admin & user himself)
 */
const likePost = asyncHandler( async (req,res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("userId",["_id" ,"email"])
    const postOwner = await User.findById(post.userId);
    const likerId =req.params.userId;
    const liker = await User.findById(likerId);
    const isLiked = post.likes.get(likerId);
    console.log(postId);
    console.log(post.userId);
    console.log(likerId);
    if (post && postOwner && liker){
        if (isLiked) {
            post.likes.delete(likerId);
            await post.save();
            res.status(200).json({message : `${liker.firstName} ${liker.lastName} has unliked ${postOwner.firstName} ${postOwner.lastName} is post`})
        } else {
            post.likes.set(likerId, true);
            await post.save();
            res.status(200).json({message : `${liker.firstName} ${liker.lastName} has liked ${postOwner.firstName} ${postOwner.lastName} is post`})
        }
    } else if (!post){
        res.status(404).json({message : "Post Not Found"})
    } else if (!postOwner){
        res.status(404).json({message : "PostOwner Not Found"})
    } else if (!liker){
        res.status(404).json({message : "liker Not Found"})
    }

} )

/** 
 * @desc    Delete Post by postId
 * @route   /api/posts/:postId
 * @method  Delete
 * @access  Private (only admin & user himself)
 */
const deletePostByPostId = asyncHandler( async (req,res) => {
    const post = await Post.findById(req.params.postId).populate("userId",["_id" ,"lastName"])
    if (post){
        const postOwner=post.userId;
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json({message:`${postOwner.lastName} Post has been Deleted` })
    } else (
        res.status(404).json({message : "post Not Found"})
    )
} )

/** 
 * @desc    Update Post by postId
 * @route   /api/posts/:postId
 * @method  PUT
 * @access  Private
 */
const updatePostByPostId = asyncHandler( async (req,res) => {
    const post = await Post.findById(req.params.postId)
    if (!post){
        res.status(404).json({message : "Post Not Found"})
    } 

    const {error} = updatePostValidation(req.body);
    if (error){
        res.status(400).json({message : error.details[0].message});
    }
    const imgPath = req.file ? req.file.path : "";
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
        $set : {
            description : req.body.description,
            picturePath : imgPath,
        }
    },{new : true}).populate("userId",["_id" ,"lastName"])
    res.status(200).json(updatedPost);
    } 
)

export {
    addPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    deletePostByPostId,
    updatePostByPostId
}