import mongoose from "mongoose";
import { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
