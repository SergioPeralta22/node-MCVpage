import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Property = db.define('properties', {
    id: {
        type: DataTypes.UUID, //*UUID is a type of data that is used to identify a specific instance of a data type.
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parkingSpaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Property;
