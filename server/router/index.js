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

router.get("/novel/main/recent", controller.getMainRecent);
router.get("/novel/main/popular", controller.getMainPopular);

router.get("/search/query", controller.getSearch);

router.get("/sort/getdata", controller.getSort);


router.get("/novel/edit", controller.getNovelEdit);
router.patch("/patch/novel", controller.patchNovel);

router.get("/novel/round/edit", controller.getRoundEdit);
router.patch("/patch/round/novel", controller.patchRound);

router.delete("/novel/delete", controller.deleteNovel);
router.delete("/novel/round/delete", controller.deleteRound);

// router.patch("/todo/:todoId", controller.patch_todo);
// router.delete("/todo/:todoId", controller.delete_todo);

module.exports = router;
