import { Router } from "express";
import { getAllPosts, createPost, createAnswer, createReply, listMessages, } from "../controllers/postController.js";
import { showLogin, login, showSignup, signup, showProfile, updateProfile } from "../controllers/authController.js";
const router = Router();
router.get("/index", getAllPosts);
router.post("/createMessage", createPost);
router.post("/createAnswer", createAnswer);
router.post("/createReply", createReply);
router.get("/listMessage", listMessages);
router.get("/", showLogin);
router.post("/signin", login);
router.get("/signup", showSignup);
router.post("/signup", signup);
router.get("/profile", showProfile);
router.put("/profile", updateProfile);
export default router;
//# sourceMappingURL=index.js.map