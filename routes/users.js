const express = require('express');
const { createUser, userLogin, userForgotPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.post('/forgot-password', (userForgotPassword));
userRoute.post('/login', (userLogin));

module.exports = { userRoute };
