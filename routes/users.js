const express = require('express');
const { createUser } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/users/createUser', (createUser));

module.exports = { userRoute };
