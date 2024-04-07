import express from "express";
import { login, register } from "../controllers/authentication-controller.mjs";
const router = express.Router();


// api/auth/register
router.post("/register", register);

// api/auth/login
router.post("/login", login)


export default router;