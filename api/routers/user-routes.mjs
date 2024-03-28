import express from "express";
import { getUsers, login, signup } from "../controllers/users-controller.mjs";
import { check } from "express-validator";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post(
  "/register",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);
userRouter.post("/login", login);

export default userRouter;
