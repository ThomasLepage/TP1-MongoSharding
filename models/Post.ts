import { Schema, model } from "mongoose";
import { IPost, IAnswer, IReply } from "../types/index.js";

const replySchema = new Schema<IReply>({
  message: { type: String, required: true },
  author: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const answerSchema = new Schema<IAnswer>({
  message: { type: String, required: true },
  author: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  replies: [replySchema],
});

const postSchema = new Schema<IPost>({
  post_id: { type: Number, required: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  answers: [answerSchema],
  creationDate: { type: Date, default: Date.now },
});

export default model<IPost>("Post", postSchema);
