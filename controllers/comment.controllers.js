const { comment } = require('../models/comment-models');
const { post } = require('../models/post-models');
const { user } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function createComment(req, res) {

    const { content, post_id, userId } = req.body;
    try {
        await comment.create({
            content,
            post_id,
            userId
        });
        res.status(201).send({ message: "Nouveau commentaire enregistré !" });
    } catch (err) {
        res.status(409).send({ message: "Commentaire pas enregistré : " + err + req.body.content + req.body.post_id + req.body.userId });
    }
}

async function deleteComment(req, res) {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    const admin = decoded.admin;

    const { comment_id } = req.params;

    try {

        if (admin === 1) {
            await comment.destroy({ where: { comment_id } });
            res.status(200).send({ message: "Commentaire supprimé !" });
        } else {
            res.status(401).send({ message: "Vous n'avez pas le droit de supprimer ce commentaire !" });
        }
    } catch (err) {
        res.status(409).send({ message: "Commentaire pas supprimé : " + err });
    }
}

async function getAllComments(req, res) {
    try {
        const comments = await comment.findAll({
            include: [{
                model: post,
                attributes: ["title", "userId", "id"]
            }, {
                model: user,
                attributes: ["firstname", "name", "email", "profil_picture"]
            }]
        });
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la récupération des commentaires : " + err });
    }
}

async function getCommentsByPost(req, res) {
    const { post_id } = req.params;
    try {
        const comments = await comment.findAll({
            where: { post_id },
            include: [{
                model: user,
                attributes: ["firstname", "name", "email", "profil_picture"]
            }, {
                model: post,
                attributes: ["id", "title", "userId"]
            }]
        });
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la récupération des commentaires : " + err });
    }
}


module.exports = { createComment, deleteComment, getAllComments, getCommentsByPost };
