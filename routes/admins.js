const express = require('express');
const { createAdmin, adminResetPassword } = require('../controllers/adminC');

const route = express.Router();

route.post('/admins/createAdmin', (createAdmin));
route.patch('/admins/adminResetPassword/:id/:token', (adminResetPassword));

module.exports = { route }
