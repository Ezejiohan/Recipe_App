const asyncWrapper = require('../middleware/async');
const { fetchIngredient } = require('../repository/ingredient');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

const createRecipe = asyncWrapper(async (req, res, next) => {
    const { name, ingredients, steps, estimatedCookingTime, serving } = req.body;

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

module.exports = { createRecipe }
