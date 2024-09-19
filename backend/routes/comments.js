const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {doAddComment,
       doGetComments} = require("../controllers/comment-controllers");

router.route("/addComment/:id").post(verifyToken, doAddComment);

router.route("/getAll/:id").get(doGetComments);

module.exports = router;
