import { Schema, model } from "mongoose";
const userSchema = new Schema({
    user_id: { type: Number, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
});
export default model("User", userSchema);
//# sourceMappingURL=User.js.map