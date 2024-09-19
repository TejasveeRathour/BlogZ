const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const { validateCreatePost }  = require('../middleware/createPostValidator');
const {validateEditPost} = require('../middleware/editPostValidator');
const verifyToken = require('../middleware/verifyToken');

const {doCreatePost} = require('../controllers/blog-controllers');

// add post
router.route('/post').post(verifyToken ,uploadMiddleware.single('file'),validateCreatePost, doCreatePost);

// update a post 
router.route('/updatepost').put(verifyToken, uploadMiddleware.single('file'),validateEditPost, doUpdatePost);

module.exports = router;