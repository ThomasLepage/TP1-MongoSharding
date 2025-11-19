import { Schema, model } from "mongoose";
const groupSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: Number, required: true }], // Array of user_id
    createdBy: { type: Number, required: true }, // user_id of the creator
    createdAt: { type: Date, default: Date.now },
});
export default model("Group", groupSchema);
//# sourceMappingURL=Group.js.map