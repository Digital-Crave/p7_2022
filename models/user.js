const sequelize = require('../config/config').sequelize;
const { Sequelize, DataTypes } = require('sequelize');
const { post } = require('../models/post-models');
const { comment } = require('../models/comment-models');

const user = sequelize.define('user', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
});

user.hasMany(post, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

post.belongsTo(user, {
    foreignKey: 'userId',
    sourceKey: 'id',
});

user.hasMany(comment, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

comment.belongsTo(user, {
    foreignKey: 'userId',
    sourceKey: 'id',
});


module.exports = { user };