import { Schema, model } from "mongoose";
import { IUser } from "../types/index.js";

const userSchema = new Schema<IUser>({
  user_id: { type: Number, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
});

export default model<IUser>("User", userSchema);
