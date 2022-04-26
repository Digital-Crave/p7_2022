const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controllers");
const { authenticatedUser } = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.use(authenticatedUser);

router.post("/", multer, postCtrl.createPost);

router.get('/', postCtrl.getAllPosts);

router.get('/:id', postCtrl.getOnePost);

router.get('/user/:id', postCtrl.getPostsByUser);

router.delete('/:id', postCtrl.deletePost);

module.exports = router;

