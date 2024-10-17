const express = require('express');
const { createUser, userLogin, userForgotPassword, resetUserPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.patch('/:id/:token', (resetUserPassword));
userRoute.post('/forgot-password', (userForgotPassword));
userRoute.post('/login', (userLogin));

module.exports = { userRoute };
