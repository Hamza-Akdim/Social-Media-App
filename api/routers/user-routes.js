const express = require("express");
const { addRemoveFriend, deleteUserByID, getAllUsers, getUserByID, getUserFriendsByID, updateUserByID} = require("../controllers/user-controller.js" );
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken.js");
const upload = require("./uploadImages.js");

const router = express.Router();


// /api/users/
router.get("/", verifyTokenAndAdmin ,getAllUsers);

// /api/users/:id
router.route("/:id")
        .put(upload.single('image'), verifyTokenAndAuthorization, updateUserByID)
        .get(verifyTokenAndAuthorization, getUserByID)
        .delete(verifyTokenAndAuthorization, deleteUserByID)

// /api/users/:id/friends
router.get("/:id/friends", verifyTokenAndAuthorization, getUserFriendsByID)

// /api/users/:id/friendId
router.post("/:id/:friendId", verifyTokenAndAuthorization, addRemoveFriend)

module.exports = router;

