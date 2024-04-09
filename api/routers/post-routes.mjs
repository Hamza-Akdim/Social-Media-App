import express from "express";
const router = express.Router();
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken.mjs";
import upload from "./uploadImages.mjs";
import { addPost, deletePostByPostId, getFeedPosts, getUserPosts, likePost, updatePostByPostId } from "../controllers/post-controller.mjs";


// /api/posts/
router.route("/")
        .post(upload.single('image'), verifyTokenAndAuthorization, addPost)
        .get(getFeedPosts)


// /api/posts/:userId
router.route("/:userId")
        .get(verifyTokenAndAuthorization, getUserPosts)

// /api/posts/:postId/:userId
router.route("/:postId/:userId")
        .patch(verifyTokenAndAuthorization, likePost)

// /api/posts/:postId
router.route("/:postId")
        .delete(verifyTokenAndAuthorization, deletePostByPostId)
        .put(verifyTokenAndAuthorization, updatePostByPostId)

export default router;