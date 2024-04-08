import express from "express";
import { addRemoveFriend, deleteUserByID, getAllUsers, getUserByID, getUserFriendsByID, updateUserByID} from "../controllers/user-controller.mjs" ;
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.mjs";
import upload from "./uploadImages.mjs";

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

export default router;
