const Ingredient = require ('../models/ingredient');

exports.createIngredients = async (options) => {
    return await Ingredient.create(options)
}
