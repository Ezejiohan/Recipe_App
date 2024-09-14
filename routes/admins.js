const express = require('express');
const { createAdmin } = require('../controllers/adminC');

const route = express.Router();

route.post('/admins/createAdmin', (createAdmin));

module.exports = { route }
