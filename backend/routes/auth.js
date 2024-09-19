const express = require('express');
const router = express.Router();
const multer = require('multer');

const {doRegister, doLogin, doProfile, doUpdatePass} = require('../controllers/auth-controllers');
const { registerValidator, registerValidationMiddleware } = require('../middleware/registerUserValidator');
const { validateProfilePhoto } = require('../middleware/validateProfilePhoto');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const verifyToken = require('../middleware/verifyToken');
const { updateValidator, updateValidationMiddleware } = require('../middleware/updateUserValidator');

// register a user
router.route('/register').post(uploadMiddleware.single('file'),validateProfilePhoto,registerValidator, registerValidationMiddleware,doRegister);

// login user
router.route('/login').post(doLogin);

// access profile of a user
router.route('/:id').get(doProfile);

// update password of a user
router.route('/updatepassword/:id').post(verifyToken ,updatePassValidator, updatePassValidationMiddleware, doUpdatePass);

module.exports = router;