const { user } = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')


async function createUser(req, res) {
    const { name, firstname, email, password } = req.body

    const hash = await hashPassword(password)

    const usernew = user.build({ name, firstname, email, password: hash })
    console.log(usernew)
    try {
        await usernew.save()
        res.status(201).send({ message: "Nouvel utilisateur enregistré ! " })
    } catch (err) {
        res.status(409).send({ message: "Utilisateur pas enregistré : " + err })
    }
}

function hashPassword(password) {
    if (!password) {
        return
    } else {
        return bcrypt.hash(password, saltRounds)
    }
}

async function userLog(req, res) {
    try {

        const email = req.body.email
        if (!email) {
            res.status(403).send({ message: "Email ou Mot de passe incorrect ! " })
        }

        const password = req.body.password
        const userLogin = await user.findOne({ email: email })

        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            res.status(403).send({ message: "Email ou Mot de passe incorrect ! " })
        }
        const token = createToken(email)
        res.status(200).send({ userId: user?._id, token: token })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }
}

function createToken(email) {
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({ email: email }, jwtPassword, { expiresIn: "24h" })
}

module.exports = { createUser, userLog }

//fonction modifier le profil

//fonction supprimer un utilisateur
