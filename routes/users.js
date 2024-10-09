const express = require('express');
const { createUser } = require('../controllers/userC');

const userRoute = express.Router();

userRoute.post('/register', (createUser));

module.exports = { userRoute };
