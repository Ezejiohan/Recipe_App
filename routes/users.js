const express = require('express');
const { createUser, changeUserPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.put('/change-password/:id', (changeUserPassword));

module.exports = { userRoute };
