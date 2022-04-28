const { user } = require('../models/user')
const { post } = require('../models/post-models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')


async function createUser(req, res) {

    const { name, firstname, email, password, profil_picture } = req.body

    const hash = await bcrypt.hash(password, saltRounds)

    try {
        await user.create({ name, firstname, email, password: hash, profil_picture })
        res.status(201).send({ message: "Utilisateur créé avec succès" })
    } catch (err) {
        res.status(409).send({ message: "Utilisateur pas enregistré : " + err })
    }
}

async function userConnect(req, res) {
    try {

        const email = req.body.email
        if (!email) {
            res.status(403).send({ message: "Email ou Mot de passe incorrect ! " })
        }

        const password = req.body.password
        const users = await user.findOne({ where: { email: email } })

        const validatePassword = await bcrypt.compare(password, users.password)
        if (!validatePassword) {
            res.status(403).send({ message: "Email ou Mot de passe incorrect ! " })
        }

        const token = createToken(users)
        res.status(200).send({ userId: users.id, token: token })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }
}

function createToken(users) {
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({ userId: users.id }, jwtPassword, { expiresIn: "24h" })
}

async function getOneUser(req, res) {
    const id = req.params.id
    try {
        const users = await user.findOne({ where: { id: id } })
        res.status(200).send(users)
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await user.findAll()
        res.status(200).send(users)
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }
}

async function deleteUserAndPosts(req, res) {
    const id = req.params.id
    try {
        await user.destroy({ where: { id: id } })
        await post.destroy({ where: { userId: id } })
        res.status(200).send({ message: "Utilisateur et ses posts supprimés" })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id
        const users = {
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
        }
        if (req.file) {
            users.profil_picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        await user.update({
            name: users.name,
            firstname: users.firstname,
            email: users.email,
            profil_picture: users.profil_picture
        }, { where: { id: id } })
        res.status(200).send({ message: "Utilisateur modifié avec succès" })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }
}





module.exports = { createUser, userConnect, getOneUser, getAllUsers, deleteUserAndPosts, updateUser }
