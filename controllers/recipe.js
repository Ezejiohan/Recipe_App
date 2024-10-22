const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');
const { createIngredients } = require('../repository/ingredient');

const registerIngredient = asyncWrapper(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(createCustomError("Ingredient name is required", 400));
    }

    const ingredient = await createIngredients({ name });

    await ingredient.save();

    res.status(201).json({ message: "Ingredient created successfully", ingredient });

});

module.exports = { registerIngredient }
