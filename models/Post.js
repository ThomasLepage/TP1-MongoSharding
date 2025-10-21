import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  message: String,
  author: String,
  creationDate: { type: Date, default: Date.now },
});

const postSchema = new Schema({
  post_id: Number,
  message: String,
  author: String,
  answers: [answerSchema],
  creationDate: { type: Date, default: Date.now },
});

export default model("Post", postSchema);

