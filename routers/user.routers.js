const { createUser, userConnect } = require("../controllers/user.controllers");

const express = require("express");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", userConnect);

module.exports = router;
