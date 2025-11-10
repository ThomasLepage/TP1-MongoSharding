import Group from "../models/Group.js";
import User from "../models/User.js";
export const createGroup = async (req, res) => {
    const { name, userIds } = req.body;
    const createdBy = req.session?.userId;
    try {
        // Vérifier que l'utilisateur est connecté
        if (!createdBy) {
            res.status(401).json({ error: "Utilisateur non authentifié" });
            return;
        }
        // Vérifier que le nom du groupe est fourni
        if (!name || name.trim() === "") {
            res.status(400).json({ error: "Le nom du groupe est requis" });
            return;
        }
        // Vérifier que l'utilisateur créateur existe
        const creator = await User.findOne({ user_id: createdBy });
        if (!creator) {
            res.status(404).json({ error: "Utilisateur créateur introuvable" });
            return;
        }
        // Vérifier que tous les utilisateurs existent
        const allUserIds = [...new Set([createdBy, ...(userIds || [])])]; // Inclure le créateur et éviter les doublons
        const users = await User.find({ user_id: { $in: allUserIds } });
        if (users.length !== allUserIds.length) {
            res.status(404).json({ error: "Un ou plusieurs utilisateurs sont introuvables" });
            return;
        }
        // Créer le groupe
        const group = await Group.create({
            name: name.trim(),
            users: allUserIds,
            createdBy,
            createdAt: new Date(),
        });
        res.json({ success: true, group });
    }
    catch (error) {
        console.error("Erreur lors de la création du groupe:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("user_id firstname lastname email")
            .sort({ firstname: 1, lastname: 1 });
        res.json(users);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
//# sourceMappingURL=groupController.js.map