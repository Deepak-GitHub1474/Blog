const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const userController = require("../controllers/user-controller");

// Sign Up
router.post('/signup', userController.userRegister);

// Login
router.post('/signin', userController.userLogin);

// Secure user data
// router.get('/', authenticateUser, userController.userActionController);
router.get('/', userController.userActionController);

module.exports = router;
