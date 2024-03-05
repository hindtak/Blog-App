const { model } = require('mongoose');
const userController = require('../controllers/register')
const express = require('express')
const userRouter = express.Router();

userRouter.post('/register' , userController.userRegister);
userRouter.post('/login' , userController.userLogin);

 module.exports = userRouter