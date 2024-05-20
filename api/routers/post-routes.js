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
} = require("../controllers/post-controller.js");

// /api/posts/
router
  .route("/")
  .post(upload.single("postPicture"), verifyToken, authorization, addPost)
  .get(getFeedPosts);

// /api/posts/:userId
router.route("/:userId").get(verifyToken, authorization, getUserPosts);

// /api/posts/:postId/:userId
router.route("/:postId/:userId").patch(verifyToken, authorization, likePost);

// /api/posts/:postId
router
  .route("/:postId")
  .delete(verifyToken, authorization, deletePostByPostId)
  .put(verifyToken, authorization, updatePostByPostId);

module.exports = router;
