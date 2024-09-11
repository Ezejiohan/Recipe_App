const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname must be provided"],
        trim: true,
        maxlength: [15, "Firstname must not have more than 15 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname must be provided"],
        trim: true,
        maxlength: [15, "Lastname must not be more than 15 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be 10 characters long and include at least one uppercase and one special character"],
        maxlength: [10, "Password must not be more than 10 characters"]
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;