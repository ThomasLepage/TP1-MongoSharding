import { Request, Response } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { CreatePostRequest, CreateAnswerRequest, CreateReplyRequest } from "../types/index.js";

export const getAllPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const posts = await Post.find().sort({ post_id: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createPost = async (
  req: Request<{}, {}, CreatePostRequest>,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createAnswer = async (
  req: Request<{}, {}, CreateAnswerRequest>,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createReply = async (
  req: Request<{}, {}, CreateReplyRequest>,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const listMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const posts = await Post.find().sort({ post_id: -1 });
    const userId = req.session?.userId || req.query.userId || "";
    res.render("listMessage", { posts, userId });
  } catch (error) {
    res.status(500).render("error", { message: "Erreur serveur" });
  }
};
