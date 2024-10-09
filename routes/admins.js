const express = require('express');
const { createAdmin, adminResetPassword } = require('../controllers/adminC');

const route = express.Router();

route.post('/register', (createAdmin));
route.patch('/:id/:token', (adminResetPassword));

module.exports = { route }
