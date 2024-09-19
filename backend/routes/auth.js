const express = require('express');
const router = express.Router();
const multer = require('multer');

const {doRegister, doLogin, doProfile} = require('../controllers/auth-controllers');
const { registerValidator, registerValidationMiddleware } = require('../middleware/registerUserValidator');
const { validateProfilePhoto } = require('../middleware/validateProfilePhoto');
const uploadMiddleware = multer({dest: 'uploads/'}); 

// register a user
router.route('/register').post(uploadMiddleware.single('file'),validateProfilePhoto,registerValidator, registerValidationMiddleware,doRegister);

// login user
router.route('/login').post(doLogin);

// access profile of a user
router.route('/:id').get(doProfile);

module.exports = router;