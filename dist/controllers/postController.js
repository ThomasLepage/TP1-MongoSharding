import Post from "../models/Post.js";
import User from "../models/User.js";
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ post_id: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export const createPost = async (req, res) => {
    const { authorId, message } = req.body;
    try {
        const user = await User.findOne({ user_id: authorId });
        if (!user) {
            res.status(404).json({ error: "Auteur introuvable" });
            return;
        }
        const post = await Post.create({
            post_id: Date.now(),
            author: user.firstname,
            message,
        });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export const createAnswer = async (req, res) => {
    const { authorId, messageId, answer } = req.body;
    try {
        const user = await User.findOne({ user_id: authorId });
        const post = await Post.findOne({ post_id: messageId });
        if (!user) {
            res.status(404).json({ error: "Auteur introuvable" });
            return;
        }
        if (!post) {
            res.status(404).json({ error: "Message introuvable" });
            return;
        }
        post.answers.push({
            message: answer,
            author: user.firstname,
            creationDate: new Date(),
            replies: [],
        });
        await post.save();
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export const createReply = async (req, res) => {
    const { authorId, messageId, answerIndex, reply } = req.body;
    try {
        const user = await User.findOne({ user_id: authorId });
        const post = await Post.findOne({ post_id: messageId });
        if (!user) {
            res.status(404).json({ error: "Auteur introuvable" });
            return;
        }
        if (!post) {
            res.status(404).json({ error: "Message introuvable" });
            return;
        }
        if (answerIndex < 0 || answerIndex >= post.answers.length) {
            res.status(404).json({ error: "Réponse introuvable" });
            return;
        }
        post.answers[answerIndex].replies.push({
            message: reply,
            author: user.firstname,
            creationDate: new Date(),
        });
        await post.save();
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export const listMessages = async (req, res) => {
    try {
        const posts = await Post.find().sort({ post_id: -1 });
        res.render("listMessage", { posts, userId: req.query.userId || "" });
    }
    catch (error) {
        res.status(500).render("error", { message: "Erreur serveur" });
    }
};
//# sourceMappingURL=postController.js.map