import { DataTypes } from 'sequelize/types';
import db from '../config/db';

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN,
});

export default User;
