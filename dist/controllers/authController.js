import User from "../models/User.js";
export const showLogin = (req, res) => {
    res.render("login");
};
export const showSignup = (req, res) => {
    res.render("signup");
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).render("error", { message: "Email ou mot de passe incorrect." });
            return;
        }
        // Vérifier le mot de passe (en production, utiliser bcrypt pour comparer les hash)
        if (user.password !== password) {
            res.status(401).render("error", { message: "Email ou mot de passe incorrect." });
            return;
        }
        // À la connexion, enregistrer l'utilisateur dans la session
        req.session.userId = user.user_id;
        res.redirect("/listMessage");
    }
    catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).render("error", { message: "Erreur serveur" });
    }
};
export const signup = async (req, res) => {
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
    }
    catch (error) {
        console.error("Erreur lors de la création du compte:", error);
        res.status(500).render("error", { message: "Erreur serveur lors de la création du compte" });
    }
};
export const showProfile = async (req, res) => {
    const userId = req.session?.userId;
    if (!userId) {
        res.status(400).render("error", { message: "ID utilisateur requis." });
        return;
    }
    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            res.status(404).render("error", { message: "Utilisateur non trouvé." });
            return;
        }
        res.render("profile", { user });
    }
    catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        res.status(500).render("error", { message: "Erreur serveur" });
    }
};
export const updateProfile = async (req, res) => {
    const { userId, firstname, lastname, email, password, avatar } = req.body;
    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            res.status(404).render("error", { message: "Utilisateur non trouvé." });
            return;
        }
        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        if (email !== user.email) {
            const existingUser = await User.findOne({ email, user_id: { $ne: userId } });
            if (existingUser) {
                res.status(400).render("error", { message: "Cet email est déjà utilisé par un autre compte." });
                return;
            }
        }
        // Préparer les données de mise à jour
        const updateData = {
            firstname,
            lastname,
            email,
            avatar: avatar || "https://via.placeholder.com/150"
        };
        // Ne mettre à jour le mot de passe que s'il est fourni
        if (password && password.trim() !== "") {
            updateData.password = password; // Note: En production, il faudrait hasher le mot de passe
        }
        // Mettre à jour l'utilisateur
        await User.findOneAndUpdate({ user_id: userId }, updateData);
        res.json({
            success: true,
            message: "Profil mis à jour avec succès"
        });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        res.status(500).render("error", { message: "Erreur serveur lors de la mise à jour du profil" });
    }
};
//# sourceMappingURL=authController.js.map