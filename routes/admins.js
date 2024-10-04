const express = require('express');
const { createAdmin } = require('../controllers/adminC');

const route = express.Router();

route.post('/register', (createAdmin));

module.exports = { route }
