import express from 'express';
import {
    loginForm,
    registerForm,
    forgotPasswordForm,
    toRegist,
    confirmUser,
} from '../controllers/userController.js';

const router = express.Router();

//? en todas las rutas hay un callback

// router.get('/', (req, res) => {
//     res.send('Hello World desde express');
// });

router.get('/login', loginForm);

router.get('/register', registerForm);
router.post('/register', toRegist);

router.get('/confirm/:token', confirmUser);

router.get('/forgot-password', forgotPasswordForm);

export default router;
