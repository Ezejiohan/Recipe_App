const express = require('express');

const { createRecipe } = require('../controllers/recipe');

const { authenticate } = require('../middleware/authentication');

const recipeRoute = express.Router();

recipeRoute.post('/:adminId', authenticate, (createRecipe));


module.exports = { recipeRoute };
