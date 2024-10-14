const express = require('express');
const { createUser, userLogin, changeUserPassword } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.post('/userLogin', (userLogin));
userRoute.put('/changeUserPassword/:id', (changeUserPassword));

module.exports = { userRoute };
