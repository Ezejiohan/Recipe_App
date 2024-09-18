const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipes',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Reviews', reviewSchema);
module.exports = Review;
