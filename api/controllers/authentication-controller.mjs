import asyncHandler from "express-async-handler";
import {User, validateLoginUser, validateRegisterUser} from "../models/User.mjs";
import bcrypt from "bcryptjs";


/** 
 * @desc    Register new User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 */
const register = asyncHandler( async (req,res) => {
    const {error} = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let user = await User.findOne({ email : req.body.email });
    if (user){
        return res.status(400).json({ message : "this user already regitered"});
    }

    const salt = await bcrypt.genSalt(10);  // generate hashing 
    // password = "amine123" => password = "eafuhouh"
    req.body.password = await bcrypt.hash( req.body.password, salt );

    user = new User ({
        email : req.body.email,
        password : req.body.password,
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        dateOfBirth : req.body.dateOfBirth,
        bioContent : req.body.bioContent,
        location : req.body.location,
        occupation : req.body.occupation,
    });
    const result = await user.save();
    const token = user.generateToken();
    const { password , ...other} = result._doc;

    res.status(201).json({...other, token});
    }
)

/** 
 * @desc    Login new User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 */
const login = asyncHandler( async (req,res) => {
    const {error} = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let user = await User.findOne({ email : req.body.email });
    if (!user){
        return res.status(400).json({ message : "invalid Email or Password"});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password)
    if (!isPasswordMatch){
        return res.status(400).json({ message : "invalid Email or Password"});
    }

    const token = user.generateToken();
    const { password , ...other} = user._doc;
    res.status(200).json({...other, token});
    }
)

export {
    register,
    login,
}