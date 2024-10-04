const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');
const { fetchAdmin, registerAdmin } = require('../repository/admin');

const createAdmin = asyncWrapper(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    const adminExist = await fetchAdmin({ email });
    if (adminExist) {
        return next(createCustomError("Admin already exist", 403));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newAdmin = await registerAdmin({
        firstname,
        lastname,
        email,
        password: hashPassword
    })

    res.status(201).json({ msg: 'Admin created successfully', admin: newAdmin });
});

module.exports = { createAdmin }
