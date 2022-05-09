const { user } = require("../models/user");
const { post } = require("../models/post-models");
const { comment } = require("../models/comment-models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const fs = require("fs");

async function createUser(req, res) {
    const { name, firstname, email, password, profil_picture, admin } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    try {
        await user.create({
            name,
            firstname,
            email,
            password: hash,
            profil_picture,
            admin
        });
        res.status(201).send({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        res.status(409).send({ message: "Utilisateur pas enregistré : " + err });
    }
}

async function userConnect(req, res) {
    try {
        const email = req.body.email;
        if (!email) {
            res.status(403).send({ message: "Email ou Mot de passe incorrect ! " });
        }

        const password = req.body.password;
        const users = await user.findOne({ where: { email: email } });

        const validatePassword = await bcrypt.compare(password, users.password);
        if (!validatePassword) {
            res.status(403).send({ message: "Email ou Mot de passe incorrect ! " });
        }

        const token = createToken(users);
        res.status(200).send({ userId: users.id, token: token, admin: users.admin });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Erreur interne du serveur" });
    }
}

function createToken(users) {
    const jwtPassword = process.env.JWT_PASSWORD;
    return jwt.sign({ userId: users.id, admin: users.admin }, jwtPassword, { expiresIn: "24h" });
}

async function getOneUser(req, res) {
    const id = req.params.id;
    try {
        const users = await user.findOne({ where: { id: id } });
        res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Erreur interne du serveur" });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await user.findAll();
        res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Erreur interne du serveur" });
    }
}

async function deleteUserAndPosts(req, res) {
    const id = req.params.id;

    try {

        const posts = await post.findAll({ where: { userId: id } });
        const userResponse = await user.findOne({ where: { id: id } });

        comment.destroy({ where: { userId: id } });

        for (const element of posts) {
            if (element.image) {
                const filename = element.image.split('/images/')[1]
                fs.unlink(`./images/${filename}`, () => { });
            }
            post.destroy({ where: { userId: id } });
        }

        if (userResponse.profil_picture) {
            const filename = userResponse.profil_picture.split('/images/')[1]
            fs.unlink(`./images/${filename}`, () => { });
        }
        user.destroy({ where: { id: id } });
        res.status(200).send({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Erreur interne du serveur" });
    }



}

function updateUser(req, res) {
    if (req.file) {
        user
            .findOne({ where: { id: req.params.id } })
            .then((users) => {
                if (users.profil_picture) {
                    const filename = users.profil_picture.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        const modifyUser = {
                            name: req.body.name,
                            firstname: req.body.firstname,
                            email: req.body.email,
                            profil_picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                                }`,
                        };

                        user
                            .update(modifyUser, { where: { id: req.params.id } })

                            .then(() =>
                                res.status(200).json({ message: "Utilisateur modifié !" })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    });
                } else {
                    const modifyUser = {
                        name: req.body.name,
                        firstname: req.body.firstname,
                        email: req.body.email,
                        profil_picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                            }`,
                    };

                    user
                        .update(modifyUser, { where: { id: req.params.id } })

                        .then(() =>
                            res.status(200).json({ message: "Utilisateur modifié !" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    } else {
        user
            .findOne({ where: { id: req.params.id } })
            .then((users) => {
                if (users.profil_picture && req.body.profil_picture === "") {
                    const filename = users.profil_picture.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        const modifyUser = {
                            name: req.body.name,
                            firstname: req.body.firstname,
                            email: req.body.email,
                            profil_picture: "",
                        };

                        user
                            .update(modifyUser, { where: { id: req.params.id } })

                            .then(() =>
                                res.status(200).json({ message: "Utilisateur modifié !" })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    });
                } else {
                    const modifyUser = {
                        name: req.body.name,
                        firstname: req.body.firstname,
                        email: req.body.email,
                    };

                    user
                        .update(modifyUser, { where: { id: req.params.id } })

                        .then(() =>
                            res.status(200).json({ message: "Utilisateur modifié !" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
}

module.exports = { createUser, userConnect, getOneUser, getAllUsers, deleteUserAndPosts, updateUser };
