const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredients',
            required: true
    }],
    steps: [{
            type: String,
            required: true
    }],
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admins',
        required: true
    },
    estimatedCookingTime: {
        type: Number,
        required: true
    },
    serving: {
        type: Number,
        required: true
    }
    
});

const Recipe = mongoose.model('Recipes', recipeSchema);
module.exports = Recipe;
