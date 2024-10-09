const express = require('express');

const { createAdmin, adminResetPassword, adminLogin } = require('../controllers/adminC');

const route = express.Router();

route.post('/register', (createAdmin));
route.patch('/:id/:token', (adminResetPassword));
route.post('/adminLogin', (adminLogin));

module.exports = { route }
