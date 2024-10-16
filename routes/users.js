const express = require('express');
const { createUser, userForgotPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.post('/forgot-password', (userForgotPassword));

module.exports = { userRoute };
