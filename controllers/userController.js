import User from '../models/User.js';

const loginForm = (req, res) => {
    res.render('auth/login', {
        page: 'Sign In',
    });
};

const registerForm = (req, res) => {
    res.render('auth/register', {
        page: 'Sign Up',
    });
};

//*crear un usuario
const toRegist = async (req, res) => {
    const user = await User.create(req.body);
    const { name, email, password, confirm } = req.body;

    res.json(user);
};

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Forgot Password ?',
    });
};

export { loginForm, registerForm, toRegist, forgotPasswordForm };
