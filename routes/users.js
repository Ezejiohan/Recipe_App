const express = require('express');
const { createUser, userLogin } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.post('/userLogin', (userLogin));

module.exports = { userRoute };
