const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const { validateCreatePost }  = require('../middleware/createPostValidator');
const verifyToken = require('../middleware/verifyToken');

const {doCreatePost} = require('../controllers/blog-controllers');

// add post
router.route('/post').post(verifyToken ,uploadMiddleware.single('file'),validateCreatePost, doCreatePost);