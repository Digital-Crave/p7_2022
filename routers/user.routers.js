const userCtrl = require("../controllers/user.controllers");

const express = require("express");
const router = express.Router();
const { authenticatedUser } = require("../middlewares/auth");
const validateId = require("../middlewares/validateId");
const multer = require("../middlewares/multer");


router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.userConnect);
router.get("/:id", validateId, authenticatedUser, userCtrl.getOneUser);
router.get("/", authenticatedUser, userCtrl.getAllUsers);
router.delete("/:id", validateId, authenticatedUser, userCtrl.deleteUserAndPosts);
router.put("/:id", validateId, authenticatedUser, multer, userCtrl.updateUser);

module.exports = router;
