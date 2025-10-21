import { Schema, model } from "mongoose";
import { IPost, IAnswer } from "../types/index.js";

const answerSchema = new Schema<IAnswer>({
  message: { type: String, required: true },
  author: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const postSchema = new Schema<IPost>({
  post_id: { type: Number, required: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  answers: [answerSchema],
  creationDate: { type: Date, default: Date.now },
});

export default model<IPost>("Post", postSchema);
