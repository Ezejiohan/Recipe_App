const express = require('express');

const { createRecipe, getRecipe, terminateRecipe, getAllRecipes, updateRecipe } = require('../controllers/recipe');

const { authenticate } = require('../middleware/authentication');
const { userAuthenticate } = require('../middleware/userAuthentication');

const recipeRoute = express.Router();

recipeRoute.post('/', authenticate, (createRecipe));
recipeRoute.get('/:recipeId', authenticate, (getRecipe));
recipeRoute.get('/', authenticate, (getAllRecipes));
recipeRoute.delete('/:recipeId', authenticate, (terminateRecipe));
recipeRoute.put('/:recipeId', authenticate, (updateRecipe))

module.exports = { recipeRoute };
