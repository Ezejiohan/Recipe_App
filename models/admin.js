const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname must be provided"],
        trim: true,
        maxlength: [25, "Firstname must not have more than 25 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname must be provided"],
        trim: true,
        maxlength: [25, "Lastname must not be more than 25 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be required"],
        maxlength: 1024
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const Admin = mongoose.model('Admins', adminSchema);
module.exports = Admin;
