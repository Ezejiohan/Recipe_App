const mongoose = require('mongoose');

const userFFSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
}, { timestamps: true });

const UserFF = mongoose.model('UserFF', userFFSchema);
module.exports = UserFF;
