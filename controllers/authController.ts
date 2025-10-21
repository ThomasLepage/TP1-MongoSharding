import { Request, Response } from "express";
import User from "../models/User.js";
import { LoginRequest, SignupRequest } from "../types/index.js";

export const showLogin = (req: Request, res: Response): void => {
  res.render("login");
};

export const showSignup = (req: Request, res: Response): void => {
  res.render("signup");
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.render("error", { message: "Email non trouvé." });
      return;
    }
    res.redirect(`/listMessage?userId=${user.user_id}`);
  } catch (error) {
    res.status(500).render("error", { message: "Erreur serveur" });
  }
};

export const signup = async (
  req: Request<{}, {}, SignupRequest>,
  res: Response,
): Promise<void> => {
  const { firstname, lastname, email, password, avatar } = req.body;
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).render("error", { message: "Un compte avec cet email existe déjà." });
      return;
    }

    // Générer un nouvel ID utilisateur
    const lastUser = await User.findOne().sort({ user_id: -1 });
    const newUserId = lastUser ? lastUser.user_id + 1 : 1;

    // Créer le nouvel utilisateur
    const newUser = new User({
      user_id: newUserId,
      firstname,
      lastname,
      email,
      password, // Note: En production, il faudrait hasher le mot de passe
      avatar: avatar || "https://via.placeholder.com/150"
    });

    await newUser.save();
    
    res.json({ 
      success: true, 
      userId: newUserId,
      message: "Compte créé avec succès" 
    });
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    res.status(500).render("error", { message: "Erreur serveur lors de la création du compte" });
  }
};
