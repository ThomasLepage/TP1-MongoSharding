import { Schema, model } from "mongoose";
const answerSchema = new Schema({
    message: { type: String, required: true },
    author: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
});
const postSchema = new Schema({
    post_id: { type: Number, required: true },
    message: { type: String, required: true },
    author: { type: String, required: true },
    answers: [answerSchema],
    creationDate: { type: Date, default: Date.now },
});
export default model("Post", postSchema);
//# sourceMappingURL=Post.js.map