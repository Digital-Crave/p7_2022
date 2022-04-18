const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/post.controllers");
const { authenticatedUser } = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.use(authenticatedUser);

router.post("/", multer, createPost);

router.get('/', getAllPosts);

module.exports = router;

