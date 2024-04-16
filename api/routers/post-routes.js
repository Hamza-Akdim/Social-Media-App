const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken.js");
const upload = require("./uploadImages.js");
const { addPost, deletePostByPostId, getFeedPosts, getUserPosts, likePost, updatePostByPostId } = require("../controllers/post-controller.js");


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

module.exports = router;
