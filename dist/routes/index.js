import { Router } from "express";
import { getAllPosts, createPost, createAnswer, createReply, listMessages, } from "../controllers/postController.js";
import { showLogin, login, showSignup, signup, showProfile, updateProfile, logout } from "../controllers/authController.js";
import { createGroup, getAllUsers } from "../controllers/groupController.js";
const router = Router();
// Middleware de protection de routes
router.use((req, res, next) => {
    const PUBLIC_ROUTES = [
        "/signin",
        "/signup",
        "/", // Affichage login (GET)
        "/logout",
    ];
    // Whitelist : Autorise toujours les routes publiques
    if (PUBLIC_ROUTES.includes(req.path) ||
        (req.method === "GET" && req.path === "/signup")) {
        return next();
    }
    // Si pas connecté ==> redirection vers login
    if (!req.session || !req.session.userId) {
        return res.redirect("/");
    }
    next();
});
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
router.get("/logout", logout);
router.post("/createGroup", createGroup);
router.get("/api/users", getAllUsers);
export default router;
//# sourceMappingURL=index.js.map