const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {doAddComment,
       doGetComments,
       doEditComment,
       doDeleteComment} = require("../controllers/comment-controllers");

router.route("/addComment/:id").post(verifyToken, doAddComment);

router.route("/getAll/:id").get(doGetComments);

router.route('/:id').put(verifyToken, doEditComment).delete(verifyToken, doDeleteComment);

module.exports = router;
