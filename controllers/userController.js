import { body, check, validationResult } from 'express-validator';
import { generateId } from '../helpers/tokens.js';

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

    res.render('templates/message', {
        page: 'Account Created Successfully',
        message: 'Please check your email to confirm your account',
    });
};

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Forgot Password ?',
    });
};

export { loginForm, registerForm, toRegist, forgotPasswordForm };
