const express = require('express');
const { createUser, userForgotPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.post('/userForgotPassword', (userForgotPassword));

module.exports = { userRoute };
