const sequelize = require('../config/config').sequelize;
const { Sequelize, DataTypes } = require('sequelize');
const { comment } = require('../models/comment-models');

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
    userId: {
        field: 'userId',
        type: DataTypes.TEXT,
        allowNull: false,
    },

});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

comment.belongsTo(post, {
    foreignKey: 'post_id',
});


module.exports = { post };