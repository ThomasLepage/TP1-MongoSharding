import { Request, Response } from "express";
import GroupPost from "../models/GroupPost.js";
import Group from "../models/Group.js";
import User from "../models/User.js";
import { Types } from "mongoose";

export const showGroupMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { groupId } = req.params;
    const userId = req.session?.userId;

    if (!userId) {
      res.redirect("/");
      return;
    }

    // Vérifier que l'utilisateur est membre du groupe
    const group = await Group.findById(groupId);
    if (!group || !group.users.includes(userId)) {
      res.status(403).render("error", { error: "Accès refusé" });
      return;
    }

    // Récupérer ou créer les messages du groupe
    let groupPost = await GroupPost.findOne({ group: groupId });
    if (!groupPost) {
      groupPost = await GroupPost.create({
        group: groupId,
        messages: [],
      });
    }

    res.render("groupMessages", {
      groupId,
      groupName: group.name,
      messages: groupPost.messages,
      userId,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).render("error", { error: "Erreur serveur" });
  }
};

export const createGroupMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { groupId, authorId, message, image } = req.body;

    if (!groupId || !authorId || !message) {
      res.status(400).json({ error: "Données manquantes" });
      return;
    }

    const user = await User.findOne({ user_id: authorId });
    if (!user) {
      res.status(404).json({ error: "Auteur introuvable" });
      return;
    }

    const group = await Group.findById(groupId);
    if (!group || !group.users.includes(authorId)) {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    let groupPost = await GroupPost.findOne({ group: groupId });
    if (!groupPost) {
      groupPost = await GroupPost.create({
        group: groupId,
        messages: [],
      });
    }

    const newMessage: any = {
      message,
      author: `${user.firstname} ${user.lastname}`,
      userId: authorId,
      createdAt: new Date(),
      answers: [],
    };

    if (image) {
      newMessage.image = image;
    }

    groupPost.messages.push(newMessage);

    await groupPost.save();
    res.json({ success: true, message: groupPost.messages[groupPost.messages.length - 1] });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createGroupAnswer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { groupId, authorId, messageIndex, answer, image } = req.body;

    if (!groupId || !authorId || messageIndex === undefined || !answer) {
      res.status(400).json({ error: "Données manquantes" });
      return;
    }

    const user = await User.findOne({ user_id: authorId });
    if (!user) {
      res.status(404).json({ error: "Auteur introuvable" });
      return;
    }

    const group = await Group.findById(groupId);
    if (!group || !group.users.includes(authorId)) {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    const groupPost = await GroupPost.findOne({ group: groupId });
    if (!groupPost || messageIndex < 0 || messageIndex >= groupPost.messages.length) {
      res.status(404).json({ error: "Message introuvable" });
      return;
    }

    const newAnswer: any = {
      message: answer,
      author: `${user.firstname} ${user.lastname}`,
      userId: authorId,
      createdAt: new Date(),
      replies: [],
    };

    if (image) {
      newAnswer.image = image;
    }

    groupPost.messages[messageIndex].answers.push(newAnswer);

    await groupPost.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createGroupReply = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { groupId, authorId, messageIndex, answerIndex, reply, image } = req.body;

    if (!groupId || !authorId || messageIndex === undefined || answerIndex === undefined || !reply) {
      res.status(400).json({ error: "Données manquantes" });
      return;
    }

    const user = await User.findOne({ user_id: authorId });
    if (!user) {
      res.status(404).json({ error: "Auteur introuvable" });
      return;
    }

    const group = await Group.findById(groupId);
    if (!group || !group.users.includes(authorId)) {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    const groupPost = await GroupPost.findOne({ group: groupId });
    if (
      !groupPost ||
      messageIndex < 0 ||
      messageIndex >= groupPost.messages.length ||
      answerIndex < 0 ||
      answerIndex >= groupPost.messages[messageIndex].answers.length
    ) {
      res.status(404).json({ error: "Message ou réponse introuvable" });
      return;
    }

    const newReply: any = {
      message: reply,
      author: `${user.firstname} ${user.lastname}`,
      userId: authorId,
      createdAt: new Date(),
    };

    if (image) {
      newReply.image = image;
    }

    groupPost.messages[messageIndex].answers[answerIndex].replies.push(newReply);

    await groupPost.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
