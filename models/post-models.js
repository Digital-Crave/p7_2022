const sequelize = require('../config/config').sequelize;
const { Sequelize, DataTypes } = require('sequelize');

const post = sequelize.define('post', {

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
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    }
},
);


module.exports = { post };