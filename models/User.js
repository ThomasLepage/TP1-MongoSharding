import { Schema, model } from "mongoose";

const userSchema = new Schema({
  user_id: Number,
  firstname: String,
  lastname: String,
  email: String,
});

export default model("User", userSchema);

