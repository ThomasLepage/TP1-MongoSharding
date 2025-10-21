import User from '../models/User.js';
export const showLogin = (req, res) => {
    res.render('login');
};
export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.render('error', { message: 'Email non trouvé.' });
            return;
        }
        res.redirect(`/listMessage?userId=${user.user_id}`);
    }
    catch (error) {
        res.status(500).render('error', { message: 'Erreur serveur' });
    }
};
//# sourceMappingURL=authController.js.map