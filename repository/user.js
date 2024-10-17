const User = require('../models/user');

exports.fetchUser = async (options) => {
    return await User.findOne(options)
};

exports.registerUser = async (options) => {
    return await User.create(options)
};

exports.fetchUserById = async (options) => {
    return await User.findById(options);
};
