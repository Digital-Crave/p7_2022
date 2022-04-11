const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/post.controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.post("/", function (req, res) {
    multer, auth, createPost
});

module.exports = router;

