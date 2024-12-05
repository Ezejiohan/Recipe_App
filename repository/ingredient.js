const Ingredient = require ('../models/ingredient');

exports.fetchIngredient = async (options) => {
    return await Ingredient.findOne(options);
};
