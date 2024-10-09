const Admin = require('../models/admin');

exports.fetchAdmin = async (options) => {
    return await Admin.findOne(options);
}

exports.registerAdmin = async (options) => {
    return await Admin.create(options)
}