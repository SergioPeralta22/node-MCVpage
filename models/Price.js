import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Price = db.define('prices', {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
});

export default Price;
