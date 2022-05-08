require('dotenv').config();
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');

async function validateId(req, res, next) {

    try {
        const User = await user.findOne({ where: { id: req.params.id } });

        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

        const userId = decoded.userId;

        if (User.userId && User.userId === userId) {
            res.status(403).send({ message: 'Requête non autorisée' });
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erreur interne du serveur' });
    }
}


module.exports = validateId;
