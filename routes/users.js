const express = require('express');
const { createUser, userLogin, userForgotPassword, resetUserPassword, changeUserPassword, getAllUsers, terminateUser, getARecipe, getAllRecipess } = require('../controllers/user');
//const { authenticate } = require('../middleware/authentication');
const { userAuthenticate } = require('../middleware/userAuthentication');

const userRoute = express.Router();

userRoute.post('/register', (createUser));
userRoute.put('/change-password/:id', (changeUserPassword));
userRoute.patch('/:id/:token', (resetUserPassword));
userRoute.post('/forgot-password', (userForgotPassword));
userRoute.post('/login', (userLogin));
//userRoute.get('/', authenticate, (getAllUsers));
//userRoute.delete('/:userId', authenticate, (terminateUser));
userRoute.get('/:recipeId', userAuthenticate, (getARecipe));
userRoute.get('/', userAuthenticate, (getAllRecipess));

module.exports = { userRoute };
