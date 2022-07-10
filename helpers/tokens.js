import jwt from 'jsonwebtoken';

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export { generateId, generateJWT };
