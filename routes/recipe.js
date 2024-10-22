const express = require('express');
const { registerIngredient } = require('../controllers/recipe');
const recipeRoute = express.Router();

recipeRoute.post('/register', (registerIngredient));

module.exports = { recipeRoute }