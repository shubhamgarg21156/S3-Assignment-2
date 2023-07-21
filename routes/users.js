const express = require("express");
const usersController = require('../controllers/usersController.js');
const router = express.Router();

const {authorizeUser} = require("../auth/authorize.js");
const {checkToken} = require("../auth/token_validation.js");

router.post('/login' , usersController.login);
router.get('/logout' , usersController.logout);
router.get('/change-password', usersController.changePassword);
router.get('/logs',checkToken,authorizeUser, usersController.logs);
router.get('/profile' , checkToken,authorizeUser,usersController.profile);

module.exports = router;