import { body, check, validationResult } from 'express-validator';
import { generateId } from '../helpers/tokens.js';
import { emailForgotPassword, emailRegistry } from '../helpers/emails.js';

import User from '../models/User.js';

const loginForm = (req, res) => {
    res.render('auth/login', {
        page: 'Sign In',
    });
};

const registerForm = (req, res) => {
    res.render('auth/register', {
        page: 'Sign Up',
        csrfToken: req.csrfToken(),
    });
};

//! crear un usuario

const toRegist = async (req, res) => {
    //*validacion
    await check('name')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .run(req);

    await check('email')
        .isEmail()
        .withMessage('Email must be a valid email')
        .run(req);

    await check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .run(req);

    await check('password_confirmation')
        .equals(req.body.password)
        .withMessage('Password must match')
        .run(req);

    let resultado = validationResult(req);
    // return res.json(resultado.array());

    //*verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        return res.render('auth/register', {
            page: 'Sign Up',
            csrfToken: req.csrfToken(),
            errors: resultado.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }

    //* verificar el usuario no este duplicado

    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
        return res.render('auth/register', {
            page: 'Sign Up',
            csrfToken: req.csrfToken(),
            errors: [
                {
                    msg: 'User already exists',
                },
            ],
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }

    //*guardando el usuario

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: generateId(),
    });

    //*enviar email con el link de confirmacion
    emailRegistry({
        name: user.name,
        email: user.email,
        token: user.token,
    });

    res.render('templates/message', {
        page: 'Account Created Successfully',
        message: 'Please check your email to confirm your account',
    });
};

//! confirmar usuario
const confirmUser = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/confirm', {
            page: 'There was an error confirming your account.',
            message: 'Invalid Token',
            error: true,
        });
    }
    user.confirm = true;
    user.token = null;
    await user.save();
    res.render('auth/confirm', {
        page: 'Account Confirmation.',
        message: 'Your account has been confirmed.',
    });
};

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Forgot Password ?',
        csrfToken: req.csrfToken(),
    });
};

const resetPassword = async (req, res) => {
    await check('email')
        .isEmail()
        .withMessage('Email must be a valid email')
        .run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/forgot-password', {
            page: 'Forgot Password ?',
            csrfToken: req.csrfToken(),
            errors: resultado.array(),
        });
    }

    //* search for user
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.render('auth/forgot-password', {
            page: 'Forgot Password ?',
            csrfToken: req.csrfToken(),
            errors: [
                {
                    msg: 'The email entered does not belong to any user',
                },
            ],
        });
    }

    //* generate token
    user.token = generateId();
    await user.save();

    //* send email with token
    emailForgotPassword({
        name: user.name,
        email: user.email,
        token: user.token,
    });

    res.render('templates/message', {
        page: 'Reset your password',
        message: 'Please check your email to reset your password',
    });
};

const checkToken = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/confirm', {
            page: 'Reset your password',
            message: 'Invalid Token',
            error: true,
        });
    }

    //* render form

    res.render('auth/reset-password', {
        page: 'Reset your password',
    });
};

const newPassword = async (req, res) => {};

export {
    loginForm,
    registerForm,
    toRegist,
    forgotPasswordForm,
    confirmUser,
    resetPassword,
    checkToken,
    newPassword,
};
