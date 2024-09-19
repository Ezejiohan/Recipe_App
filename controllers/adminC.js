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
    const correctPassword = await bcrypt.compare(loginRequest.password, admin.password)
    if (correctPassword === false) {
        return next(createCustomError("Invalid email or password", 404))
    }
    const generatedToken = jwt.sign({
        id: admin._id,
        email: admin.email,
    }, secretKey, { expiresIn: '12h' })
    const result = {
        id: admin._id,
        email: admin.email,
        token: generatedToken
    }
    return res.status(200).json({ result });
});

const adminChangePassword = asyncWrapper(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne({email: req.body.email})

    const comparePassword = await bcrypt.compare(oldPassword, admin.password)
    if (comparePassword !== true) {
        return next(createCustomError("Password incorrect", 404))
    }
    const saltPassword = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(newPassword, saltPassword);

    if (newPassword === oldPassword) {
        return next(createCustomError("Unauthorized", 404));
    }
    admin.password = hashPassword
    sendEmail({
        email: admin.email,
        subject: "Password change alert",
        message: "You have changed your password. If not you alert us"
    });
    const result = {
        fullname: admin.fullname,
        email: admin.email
    }
    await admin.save();

    return res.status(200).json({ result });
});

module.exports = { createAdmin,
    adminLogin,
    adminChangePassword
 }
