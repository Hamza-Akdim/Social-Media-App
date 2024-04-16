const express = require("express");
const { addRemoveFriend, deleteUserByID, getAllUsers, getUserByID, getUserFriendsByID, updateUserByID} = require("../controllers/user-controller.js" );
const { verifyToken, isAdmin, authorization } = require("../middlewares/verifyToken.js");
const upload = require("./uploadImages.js");

const router = express.Router();


// /api/users/
router.get("/", verifyToken, isAdmin, getAllUsers);

// /api/users/:id
router
  .route("/:id")
  .put(upload.single("image"), verifyToken, authorization, updateUserByID)
  .get(verifyToken, authorization, getUserByID)
  .delete(verifyToken, authorization, deleteUserByID);

// /api/users/:id/friends
router.get("/:id/friends", verifyToken, authorization, getUserFriendsByID);

// /api/users/:id/friendId
router.post("/:id/:friendId", verifyToken, authorization, addRemoveFriend);

module.exports = router;

