const asyncWrapper = require('../middleware/async');
const { fetchIngredient } = require('../repository/ingredient');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');
const { fetchRecipe, fetchRecipeById, deleteRecipe, recipePool } = require('../repository/recipe');

const createRecipe = asyncWrapper(async (req, res, next) => {
    const { name, ingredients, steps, estimatedCookingTime, serving } = req.body;
    const adminId = req.admin.id;
    // Map over ingredients and create if not exists
    const ingredientPromises = ingredients.map(async (name) => {
      let ingredient = await fetchIngredient({ name });
      if (!ingredient) {
        ingredient = await Ingredient.create({ name });
      }

      return ingredient._id;
    });

    const resolvedIngredients = await Promise.all(ingredientPromises);
    const newRecipe = new Recipe({
        name,
        ingredients: resolvedIngredients,
        steps,
        adminId,
        estimatedCookingTime,
        serving
    });

    await newRecipe.save();

    res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
});

const getRecipe = asyncWrapper(async(req, res, next) => {
  const { recipeId } = req.params;

  const recipe = await fetchRecipeById(recipeId);
  if (!recipe) {
    return next(createCustomError("Recipe not found", 404));
  }

  return res.status(200).json({
    message: "Recipe retrieved successfully",
    recipe,
  });

});

const getAllRecipes = asyncWrapper(async(req, res, next) => {
  const recipe = await recipePool();

  res.status(200).json({
    status: 'Success',
    numbersOfrecipes: recipe.length,
     data: recipe
  });

});   

const terminateRecipe = asyncWrapper(async(req, res, next) => {
  const { recipeId } = req.params

  const recipe = await fetchRecipe({ _id: recipeId });
  if (!recipe) {
      return next(createCustomError("Recipe not found", 404))
  } else {
      await deleteRecipe({ _id: recipeId });
  }

  return res.status(200).json({
      message: "Recipe deleted Successful"
  });

});

const updateRecipe = asyncWrapper(async (req, res, next) => {
    const { recipeId } = req.params;
    const { name, ingredients, steps, estimatedCookingTime, serving } = req.body;

    const recipe = await fetchRecipeById(recipeId);
    if (!recipe) {
        return next(createCustomError("Recipe not found", 404));
    }

    if (ingredients) {
        const ingredientPromises = ingredients.map(async (name) => {
            let ingredient = await fetchIngredient({ name });
            if (!ingredient) {
                ingredient = await Ingredient.create({ name });
            }
            return ingredient._id;
        });

        recipe.ingredients = await Promise.all(ingredientPromises);
    }

    if (name) recipe.name = name;
    if (steps) recipe.steps = steps;
    if (estimatedCookingTime) recipe.estimatedCookingTime = estimatedCookingTime;
    if (serving) recipe.serving = serving;

    const updatedRecipe = await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
});


module.exports = { createRecipe, getRecipe, getAllRecipes, terminateRecipe, updateRecipe }
