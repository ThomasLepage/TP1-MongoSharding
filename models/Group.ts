import { Schema, model } from "mongoose";
import { IGroup } from "../types/index.js";

const groupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  users: [{ type: Number, required: true }], // Array of user_id
  createdBy: { type: Number, required: true }, // user_id of the creator
  createdAt: { type: Date, default: Date.now },
});

export default model<IGroup>("Group", groupSchema);

