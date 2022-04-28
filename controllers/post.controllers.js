const { post } = require("../models/post-models");
const { user } = require("../models/user");
const { comment } = require("../models/comment-models");


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

async function deletePost(req, res) {
    try {
        await post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).send({ message: "Post supprimé !" });
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la suppression du post : " + err });
    }
}




module.exports = { createPost, getAllPosts, getOnePost, getPostsByUser, deletePost };
