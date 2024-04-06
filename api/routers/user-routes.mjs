import express from "express";
import { getUsers, login, signup } from "../controllers/users-controller.mjs";
import { check } from "express-validator";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.mjs";

const userRouter = express.Router();


// /api/users/
userRouter.get("/", verifyTokenAndAdmin ,getUsers);

// /api/users/register
userRouter.post(
  "/register",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

// /api/users/login
userRouter.post("/login", login);

export default userRouter;
