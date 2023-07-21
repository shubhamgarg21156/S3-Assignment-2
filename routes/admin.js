const express = require("express");
const adminController = require("../controllers/adminController.js");

const router = express.Router();

const {checkToken} = require("../auth/token_validation.js");
const {authorizeAdmin} = require("../auth/authorize.js");

router.get('/all', checkToken,authorizeAdmin,adminController.allUsers); //list all users
router.post('/create', checkToken,authorizeAdmin,adminController.createUser); //create a new user
router.delete('/delete',checkToken,authorizeAdmin,adminController.deleteUser); //delete a user
router.patch('/update',checkToken,authorizeAdmin,adminController.updateUser); //update a user

module.exports =  router;