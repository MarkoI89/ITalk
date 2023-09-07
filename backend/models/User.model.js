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
      default:
        "https://res.cloudinary.com/duucvjqsk/image/upload/v1694080325/ITalk_app_storage/default_avatar.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
