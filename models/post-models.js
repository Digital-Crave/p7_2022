const sequelize = require('../config/config').sequelize;
const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize');

const post = sequelize.define('post', {

    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        field: 'title',
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        field: 'content',
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        field: 'image',
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    user_id: {
        field: 'user_id',
        type: DataTypes.TEXT,
        allowNull: false,
    },
});



module.exports = { post };