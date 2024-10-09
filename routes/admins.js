const express = require('express');

const { createAdmin, adminResetPassword, adminLogin, adminForgotPassword, adminChangePassword } = require('../controllers/adminC');

const route = express.Router();

route.post('/register', (createAdmin));
route.patch('/:id/:token', (adminResetPassword));
route.post('/adminLogin', (adminLogin));
route.post('/adminForgotPassword', (adminForgotPassword));
route.put('/adminChangePassword/:id', (adminChangePassword));

module.exports = { route };
