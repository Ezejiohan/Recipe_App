const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');
const { fetchUser, registerUser, fetchUserById, updateUser } = require('../repository/user');

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

const resetUserPassword = asyncWrapper(async (req, res, next) => {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;
    const user = await fetchUserById(req.params.id);
    if (!user) {
        return next(createCustomError('User not found', 404));
    }
    await jwt.verify(token, process.env.Token);
    if (newPassword !== confirmPassword) {
        return next(createCustomError("This password are not the same", 403));
    }
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, saltPassword);

    const updatePassword = await updateUser(req.params.id, {
        password: hashPassword
    });

    await user.save();

    res.status(200).json({ msg: "Password reset successful", updatePassword });
});

module.exports = { createUser, 
    resetUserPassword 
}
