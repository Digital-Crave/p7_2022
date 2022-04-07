const { createUser, userLog } = require("../controllers/user.controllers");

const express = require("express");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", userLog);

module.exports = router;
