const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstname: {
        
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;