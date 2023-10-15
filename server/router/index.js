const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
const upload = require("../upload/upload");

router.post("/login", controller.postLogin);
router.post("/signup", controller.postSignup);
router.post("/login/check", controller.postLoginCheck);

router.post("/upload/image", upload.uploadImage, controller.postImage);

router.post("/novel/create", controller.postCreate);

router.get("/novel/list", controller.getList);

router.post("/novel/round", controller.postRound);

router.get("/novel/info", controller.getNovel);
router.get("/novel/round", controller.getRound);

// router.patch("/todo/:todoId", controller.patch_todo);
// router.delete("/todo/:todoId", controller.delete_todo);

module.exports = router;
