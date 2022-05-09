const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment.controllers');
const { authenticatedUser } = require("../middlewares/auth");

router.use(authenticatedUser);

router.post('/', commentCtrl.createComment);

router.delete('/:comment_id', commentCtrl.deleteComment);

router.get('/', commentCtrl.getAllComments);

router.get('/:post_id', commentCtrl.getCommentsByPost);

module.exports = router;