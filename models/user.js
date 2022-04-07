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
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        field: 'firstname',
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        field: 'email',
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        field: 'password',
        type: DataTypes.STRING,
        allowNull: false
    },
    profil_picture: {
        field: 'profil_picture',
        type: DataTypes.STRING,
        defaultValue: 0
    },
    admin: {
        field: 'admin',
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: true,
    },
    timestamps: false,
});

module.exports = { user };