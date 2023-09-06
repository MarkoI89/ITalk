import mongoose from "mongoose";
import { Schema } from "mongoose";

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    avatar: {
      type: String,
      default: "/img/blank-profile-picture-973460_640.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
