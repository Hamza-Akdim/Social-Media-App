import { validationResult } from "express-validator";
import { HttpError } from "../models/http-error.mjs";
import { User } from "../models/User.mjs";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    next(error);
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;

  try {
    let existUser = await User.findOne({ email: email });
    if (existUser) {
      throw new HttpError("User exists already, please login instead.", 422);
    }

    const createdUser = new User({
      email,
      password,
    });
    await createdUser.save();
    res.status(201).json(createdUser);
  } catch (err) {
    console.log("signup err", err);
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser || existingUser.password !== password) {
      throw new HttpError("Invalid credentials, could not log you in.", 401);
    }
    res.json({ message: "Logged in!" });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    next(error);
  }
};

export { getUsers, login, signup };
