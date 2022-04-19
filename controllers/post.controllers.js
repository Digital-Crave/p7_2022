const { post } = require("../models/post-models");
const { user } = require("../models/user");


async function createPost(req, res) {

    const { title, content, user_id } = req.body;

    if (req.file) {
        try {
            await post.create({
                title,
                content,
                image: `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename
                    }`,
                user_id,
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
                user_id,
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
                attributes: ["firstname", "name", "email"]
            }]
        });
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la récupération des posts : " + err });
    }
}


module.exports = { createPost, getAllPosts };
