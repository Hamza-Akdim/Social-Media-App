import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export { User };
