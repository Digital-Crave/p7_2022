const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./.env" });

function authenticatedUser(req, res, next) {
    try {

        const header = req.header('Authorization')
        console.log(header);
        if (header == null) {
            return res.status(403).send({ message: "Invalid" })
        }

        const token = req.headers.authorization.split(" ")[1]
        if (token == null) {
            return res.status(403).send({ message: "This URL must be authenticated" })
        }

        jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
            if (err) return res.status(403).send({ message: "Token invalid" + err })
            next();
        })



    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne du serveur" })
    }



}

module.exports = { authenticatedUser }