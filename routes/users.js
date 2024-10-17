const express = require('express');
const { createUser, userLogin, userForgotPassword, resetUserPassword, changeUserPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.put('/change-password/:id', (changeUserPassword));
userRoute.patch('/:id/:token', (resetUserPassword));
userRoute.post('/forgot-password', (userForgotPassword));
userRoute.post('/login', (userLogin));

module.exports = { userRoute };
