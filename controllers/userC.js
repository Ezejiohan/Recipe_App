const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');
const { fetchUser, registerUser } = require('../repository/user');

const createUser = asyncWrapper(async(req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const userExist = await fetchUser({ email })
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
    })

    res.status(201).json({ msg: 'User created successfully', user: newUser });
})

module.exports = { createUser }