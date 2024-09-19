const express = require('express');
const { createAdmin, adminLogin, adminChangePassword } = require('../controllers/adminC');

const route = express.Router();

route.post('/admins/createAdmin', (createAdmin));
route.post('/admins/adminLogin', (adminLogin));
route.put('/admins/adminChangePassword', (adminChangePassword));

module.exports = { route }
