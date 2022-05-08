const { post } = require("../models/post-models");
const { user } = require("../models/user");
const { comment } = require("../models/comment-models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require('dotenv').config();


async function createPost(req, res) {

    const { title, content, userId } = req.body;

    if (req.file) {
        try {
            await post.create({
                title,
                content,
                image: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                    }`,
                userId,
            });
            res.status(201).send({ message: "Nouveau post enregistré ! " });
        } catch (err) {
            res.status(409).send({ message: "Post pas enregistré : " + err });
        }
    } else {
        try {
            await post.create({
                title,
                content,
                userId,
            });
            res.status(201).send({ message: "Nouveau post enregistré ! " });
        } catch (err) {
            res.status(409).send({ message: "Post pas enregistré : " + err });
        }
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await post.findAll({
            include: [{
                model: user,
                attributes: ["firstname", "name", "profil_picture"],
            }, {
                model: comment,
                attributes: ["content", "post_id", "userId",],
            }],
            order: [["created_at", "DESC"]]
        });
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la récupération des posts : " + err });
    }
}

async function getOnePost(req, res) {

    const { id } = req.params;

    try {
        const posts = await post.findOne({
            where: { id },
            include: [{
                model: user,
                attributes: ["firstname", "name", "profil_picture"]
            }, {
                model: comment,
                attributes: ["content", "post_id", "userId"],
            }]
        });
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la récupération du post : " + err });
    }
}

async function getPostsByUser(req, res) {
    try {
        const posts = await post.findAll({
            where: { userId: req.params.id },
            include: [{
                model: user,
                attributes: ["firstname", "name"]
            }]
        });
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la récupération des posts : " + err });
    }
}

function deletePost(req, res) {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    const admin = decoded.admin;

    post.findOne({ where: { id: req.params.id } }).then((posts) => {
        if (admin === 1) {
            if (posts.image) {
                const filename = posts.image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    post.destroy({
                        where: { id: req.params.id },
                    });
                    res.status(200).send({ message: "Post supprimé ! " });
                });
            } else {
                post.destroy({
                    where: { id: req.params.id },
                });
                res.status(401).send({ message: "Post supprimé ! " });
            }
        } else {
            res.status(401).send({ message: "Vous n'avez pas les droits pour supprimer ce post" });
        }
    });
}




module.exports = { createPost, getAllPosts, getOnePost, getPostsByUser, deletePost };
