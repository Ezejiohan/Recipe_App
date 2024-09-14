const mongoose = require('mongoose');
const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Ingredient = mongoose.model('Ingredients', ingredientSchema);
module.exports = Ingredient;
