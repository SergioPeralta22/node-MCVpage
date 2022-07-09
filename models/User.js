import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const User = db.define(
    'users',
    {
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
    },
    {
        hooks: {
            beforeCreate: async function (user) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
    }
);

//*custom method to compare password
// User.prototype.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

export default User;
