import { Request, Response } from "express";
import User from "../models/User.js";
import { LoginRequest } from "../types/index.js";

export const showLogin = (req: Request, res: Response): void => {
  res.render("login");
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
