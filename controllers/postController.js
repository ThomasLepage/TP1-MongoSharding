import Post from "../models/Post.js";
import User from "../models/User.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ post_id: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createPost = async (req, res) => {
  const { authorId, message } = req.body;
  try {
    const user = await User.findOne({ user_id: authorId });
    if (!user) return res.status(404).json({ error: "Auteur introuvable" });

    const post = await Post.create({
      post_id: Date.now(),
      author: user.firstname,
      message,
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createAnswer = async (req, res) => {
  const { authorId, messageId, answer } = req.body;
  try {
    const user = await User.findOne({ user_id: authorId });
    const post = await Post.findOne({ post_id: messageId });

    if (!user) return res.status(404).json({ error: "Auteur introuvable" });
    if (!post) return res.status(404).json({ error: "Message introuvable" });

    post.answers.push({
      message: answer,
      author: user.firstname,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const listMessages = async (req, res) => {
  try {
    const posts = await Post.find().sort({ post_id: -1 });
    res.render("listMessage", { posts, userId: req.query.userId || "" });
  } catch (error) {
    res.status(500).render("error", { message: "Erreur serveur" });
  }
};