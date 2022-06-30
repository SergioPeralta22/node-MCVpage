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

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Forgot Password ?',
    });
};

export { loginForm, registerForm, forgotPasswordForm };
