const express = require("express");
const router = express.Router();
const { verifyToken, authorization } = require("../middlewares/verifyToken.js");
const upload = require("./uploadImages.js");
const {
  addPost,
  deletePostByPostId,
  getFeedPosts,
  getUserPosts,
  likePost,
  updatePostByPostId,
  deleteComment,
  updateComment,
  commentPost,
} = require("../controllers/post-controller.js");

// /api/posts/
router
  .route("/")
  .post(upload.single("postPicture"), verifyToken, authorization, addPost)
  .get(verifyToken, authorization, getFeedPosts);

// /api/posts/:userId
router.route("/:userId").get(verifyToken, authorization, getUserPosts);

// /api/posts/:postId/:userId
router.route("/:postId/:userId").patch(verifyToken, authorization, likePost);

// /api/posts/:postId/:userId/comment
router
  .route("/:postId/:userId/comment")
  .post(verifyToken, authorization, commentPost);

// /api/posts/:postId/:commentId
router
  .route("/:postId/:commentId")
  .delete(verifyToken, authorization, deleteComment)
  .put(verifyToken, authorization, updateComment);

// /api/posts/:postId
router
  .route("/:postId")
  .delete(verifyToken, authorization, deletePostByPostId)
  .put(verifyToken, authorization, updatePostByPostId);

module.exports = router;
