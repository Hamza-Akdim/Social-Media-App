const express = require("express");
const { login, register } = require("../controllers/authentication-controller.js");
const upload = require("./uploadImages.js");
const router = express.Router();


// api/auth/register
router.post("/register", upload.single('image'),register);

// api/auth/login
router.post("/login", login)


module.exports = router;