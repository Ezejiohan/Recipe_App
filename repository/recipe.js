const Recipe = require('../models/recipe');

exports.fetchRecipe = async (options) => {
    return await Recipe.findOne(options)
};

exports.fetchRecipeById = async (options) => {
    return await Recipe.findById(options);
};

exports.recipePool = async (options) => {
    return await Recipe.find(options)
};

exports.deleteRecipe = async (options) => {
    return await Recipe.deleteOne(options)
};
