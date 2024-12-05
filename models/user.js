const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname must be provided"],
        trim: true,
        maxlength: [30, "Firstname must not be more than 30 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname must be provided"],
        trim: true,
        maxlength: [30, "Lastname must not be more than 30 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    verified: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: null
    },
    bio: {
        type: String, 
        maxlength: 250,
        default: ""
    },
    phone: {
        type: String, 
        trim: true,
        default: null
    },
    address: {
        street: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        postalCode: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        }
    },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
