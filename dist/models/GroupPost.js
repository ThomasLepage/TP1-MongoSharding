import { Schema, model } from "mongoose";
const groupReplySchema = new Schema({
    message: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, default: null }, // Base64 encoded image
});
const groupAnswerSchema = new Schema({
    message: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, default: null }, // Base64 encoded image
    replies: [groupReplySchema],
});
const groupMessageSchema = new Schema({
    message: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, default: null }, // Base64 encoded image
    answers: [groupAnswerSchema],
});
const groupPostSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    messages: [groupMessageSchema],
    createdAt: { type: Date, default: Date.now },
});
export default model("GroupPost", groupPostSchema);
//# sourceMappingURL=GroupPost.js.map