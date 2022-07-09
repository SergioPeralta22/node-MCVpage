import express from 'express';
import {
    loginForm,
    authenticate,
    registerForm,
    forgotPasswordForm,
    toRegist,
    confirmUser,
    resetPassword,
    checkToken,
    newPassword,
} from '../controllers/userController.js';

const router = express.Router();

//? en todas las rutas hay un callback

// router.get('/', (req, res) => {
//     res.send('Hello World desde express');
// });

router.get('/login', loginForm);
router.post('/login', authenticate);

router.get('/register', registerForm);
router.post('/register', toRegist);

router.get('/confirm/:token', confirmUser);

router.get('/forgot-password', forgotPasswordForm);
router.post('/forgot-password', resetPassword);

//* almacenar nuevo password
router.get('/forgot-password/:token', checkToken);
router.post('/forgot-password/:token', newPassword);

export default router;
