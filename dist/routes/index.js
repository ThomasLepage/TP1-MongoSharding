import { Router } from "express";
import { getAllPosts, createPost, createAnswer, listMessages, } from "../controllers/postController.js";
import { showLogin, login } from "../controllers/authController.js";
const router = Router();
router.get("/index", getAllPosts);
router.post("/createMessage", createPost);
router.post("/createAnswer", createAnswer);
router.get("/listMessage", listMessages);
router.get("/", showLogin);
router.post("/login", login);
export default router;
//# sourceMappingURL=index.js.map