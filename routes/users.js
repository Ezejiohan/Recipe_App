const express = require('express');
const { createUser, resetUserPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.patch('/resetUserPassword/:id/:token', (resetUserPassword));

module.exports = { userRoute };
