const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');

const createAdmin = asyncWrapper(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    const adminExist = await Admin.findOne({email});
    if (adminExist) {
        return next(createCustomError("Admin already exist", 403));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newAdmin = await Admin.create({
        firstname,
        lastname,
        email,
        password: hashPassword
    })

    res.status(201).json({ msg: 'Admin created successfully', admin: newAdmin });
});

const adminLogin = asyncWrapper(async (req, res, next) => {
    const loginRequest = { email: req.body.email, password: req.body.password }
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
        return next(createCustomError("Admin not found", 404))
    }
    const correctPassword = await bcrypt.compare(loginRequest.password, admin.password);
    if (correctPassword === false) {
        return next(createCustomError('Invalid email or password', 404))
    } else {
        const generatedToken = jwt.sign({
            id: admin._id,
            email: admin.email,
        }, process.env.TOKEN, { expiresIn: '12h' })
        const result = {
            id: admin._id,
            email: admin.email,
            token: generatedToken
        }
        return res.status(200).json({ result });
    }
})

module.exports = { createAdmin,
    adminLogin
 }
