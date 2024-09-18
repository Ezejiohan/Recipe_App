const express = require('express');
const { createAdmin, adminLogin } = require('../controllers/adminC');

const route = express.Router();

route.post('/admins/createAdmin', (createAdmin));
route.post('/admins/adminLogin', (adminLogin));

module.exports = { route }
