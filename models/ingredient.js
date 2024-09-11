const mongoose = require('mongoose');
const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true
    }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;