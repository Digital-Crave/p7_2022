const { post } = require("../models/post-models");
//const { user } = require('../models/user');


async function createPost(req, res) {

    if (req.file) {
        try {
            await post.create({
                title: req.body.title,
                content: req.body.content,
                image: `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename
                    }`,
                user_id: req.body.user_id,
            });
            res.status(201).send({ message: "Nouveau post enregistré ! " });
        } catch (err) {
            res.status(409).send({ message: "Post pas enregistré : " + err });
        }
    } else {
        try {
            await post.create({
                title: req.body.title,
                content: req.body.content,
                user_id: req.body.user_id,
            });
            res.status(201).send({ message: "Nouveau post enregistré ! " });
        } catch (err) {
            res.status(409).send({ message: "Post pas enregistré : " + err });
        }
    }
}

module.exports = { createPost };
