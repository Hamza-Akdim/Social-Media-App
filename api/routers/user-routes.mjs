import express from "express";
import { deleteUserByID, getAllUsers, getUserByID, updateUserByID} from "../controllers/users-controller.mjs" ;
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.mjs";

const router = express.Router();


// /api/users/
router.get("/", verifyTokenAndAdmin ,getAllUsers);

// /api/users/:id
router.route("/:id")
        .put(verifyTokenAndAuthorization, updateUserByID)
        .get(verifyTokenAndAuthorization, getUserByID)
        .delete(verifyTokenAndAuthorization, deleteUserByID)


export default router;
