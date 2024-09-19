const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {doAddComment} = require('../controllers/comment-controllers');

router.route('/addComment/:id').post(verifyToken, doAddComment);

module.exports = router;
 