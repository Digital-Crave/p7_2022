const sequelize = require('../config/config').sequelize;
const { Sequelize, DataTypes } = require('sequelize');
//const post = require('./post-models');
//const comment = require('./comment-models');

const user = sequelize.define('user', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profil_picture: {
        type: DataTypes.STRING,
    },
    admin: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = { user };