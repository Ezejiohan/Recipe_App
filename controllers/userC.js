const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');
const { fetchUser, registerUser, fetchUserById } = require('../repository/user');

const createUser = asyncWrapper(async(req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const userExist = await fetchUser({ email });
    if (userExist) {
        return next(createCustomError("User already exist", 403))
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await registerUser({
        firstname,
        lastname,
        email,
        password: hashPassword
    });

    res.status(201).json({ msg: 'User created successfully', user: newUser });
});

const changeUserPassword = asyncWrapper(async(req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;
    const user = await fetchUserById(id);
    if (!user) {
        return next(createCustomError("User not found", 404));
    }
    const comparePassword = await bcrypt.compare(oldPassword, user.password);
    if (comparePassword !== true) {
        return next(createCustomError("Password incorrect", 401));
    }
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, saltPassword);
    if (newPassword === oldPassword) {
        return next(createCustomError("Password are similar", 400));
    }
    user.password = hashPassword
    sendEmail({
        email: user.email,
        subject: "Password change alert",
        message: "You have changed your password. If not you alert us"
    });
    const result = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    }
    await user.save();

    return res.status(200).json({ msg: "Password changed successful", result });
});

module.exports = { createUser, 
    changeUserPassword
}
