const sequelize = require('../config/config').sequelize;
const { Sequelize, DataTypes } = require('sequelize');

const comment = sequelize.define('comment', {

    comment_id: {
        field: 'comment_id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    post_id: {
        field: 'post_id',
        type: DataTypes.INTEGER,
    },

    content: {
        field: 'content',
        type: DataTypes.TEXT,
        allowNull: false
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
    userId: {
        field: 'userId',
        type: DataTypes.TEXT,
        allowNull: false,
    },
});



module.exports = { comment };