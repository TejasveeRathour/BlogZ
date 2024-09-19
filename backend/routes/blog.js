const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const { validateCreatePost }  = require('../middleware/createPostValidator');
const {validateEditPost} = require('../middleware/editPostValidator');
const verifyToken = require('../middleware/verifyToken');

const {doCreatePost, doAccessAllPosts, doUpdatePost, doDeletePost, doSinglePost} = require('../controllers/blog-controllers');

// add post
router.route('/post').post(verifyToken ,uploadMiddleware.single('file'),validateCreatePost, doCreatePost);

// access all post
router.route('/allposts').get(doAccessAllPosts);


// access single post with given id and delete post with given id
router.route('/post/:id').get(doSinglePost).delete(verifyToken, doDeletePost);

// update a post 
router.route('/updatepost').put(verifyToken, uploadMiddleware.single('file'),validateEditPost, doUpdatePost);

module.exports = router;