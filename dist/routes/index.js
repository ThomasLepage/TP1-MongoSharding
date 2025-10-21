import { Router } from "express";
import { getAllPosts, createPost, createAnswer, createReply, listMessages, } from "../controllers/postController.js";
import { showLogin, login, showSignup, signup } from "../controllers/authController.js";
const router = Router();
router.get("/index", getAllPosts);
router.post("/createMessage", createPost);
router.post("/createAnswer", createAnswer);
router.post("/createReply", createReply);
router.get("/listMessage", listMessages);
router.get("/", showLogin);
router.post("/login", login);
router.get("/signup", showSignup);
router.post("/signup", signup);
export default router;
//# sourceMappingURL=index.js.map