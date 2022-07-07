import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const emailRegistry = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const { name, email, token } = data;

    //*enviar email con el link de confirmacion

    await transport.sendMail({
        from: 'RealState',
        to: email,
        subject: 'Confirm your account in RealState.com',
        html: `
        <h1>Hello ${name}</h1>
        <p>Please click on the link to confirm your account</p>
        <a href="${process.env.CLIENT_URL}:${
            process.env.PORT ?? 3000
        }/confirm/${token}">Confirm Account</a>

        <p>If you did not request this, please ignore this email</p>
        `,
    });

    console.log('Email sent');
};

export { emailRegistry };
