import express from "express";
import { login, register } from "../controllers/authentication-controller.mjs";
import upload from "./uploadImages.mjs";
const router = express.Router();


// api/auth/register
router.post("/register", upload.single('image'),register);

// api/auth/login
router.post("/login", login)


export default router;