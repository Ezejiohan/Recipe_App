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
        required: [true, "Password must be 10 characters long and include at least one uppercase and one special character"],
        maxlength: [50, "Password must not be more than 50 characters"]
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
