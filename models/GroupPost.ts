import { Schema, model, Types } from "mongoose";
import { IGroupPost, IGroupMessage, IGroupAnswer } from "../types/index.js";

const groupReplySchema = new Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: null }, // Base64 encoded image
});

const groupAnswerSchema = new Schema<IGroupAnswer>({
  message: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: null }, // Base64 encoded image
  replies: [groupReplySchema],
});

const groupMessageSchema = new Schema<IGroupMessage>({
  message: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: null }, // Base64 encoded image
  answers: [groupAnswerSchema],
});

const groupPostSchema = new Schema<IGroupPost>({
  group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  messages: [groupMessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default model<IGroupPost>("GroupPost", groupPostSchema);
