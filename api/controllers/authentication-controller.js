const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  User,
  validateLoginUser,
  validateRegisterUser,
} = require("../models/user.js");
const bcrypt = require("bcryptjs");

/**
 * @desc    Register new User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 */
const register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "this user already regitered" });
  }

  const salt = await bcrypt.genSalt(10); // generate hashing
  // password = "amine123" => password = "eafuhouh"
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const imgPath = req.file ? req.file.path : "";
  user = new User({
    email: req.body.email,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    picturePath: imgPath,
    friends: req.body.friends,
    dateOfBirth: req.body.dateOfBirth,
    bioContent: req.body.bioContent,
    location: req.body.location,
    occupation: req.body.occupation,
  });
  const result = await user.save();
  //   const token = user.generateToken();
  //   const { password, ...other } = result._doc;

  //   res.status(201).json({ ...other, token });
  res.status(200).json(result);
});

/**
 * @desc    Login new User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 */
const login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid Email" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalidPassword" });
  }

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token, { expire: new Date(Date.now() + 8000000) });

  const { _id, firstName, lastName, email} = user;
  return res.json({
    token: token,
    user: { _id, firstName, lastName, email},
  });
});

module.exports = {
  register,
  login,
};
