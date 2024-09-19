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

const adminForgotPassword = asyncWrapper(async (req, res, next) => {
    const admin = await Admin.findOne({email: req.body.emal})
    if (!admin) {
        return next(createCustomError("Admin not found", 404))
    }
    const token = jwt.sign({
        id: admin._id,
        email: admin.email
    }, secretKey)

    const passwordChangeLink = `${req.protocol}://${req.get("host")}/admins/change_password/${admin._id}/${token}`;
    const message = `Click this link: ${passwordChangeLink} to set a new password`;

    sendEmail({
        email: admin.email,
        subject: 'Forget password link',
        message: message
    });

    res.status(200).json({
        message: "Email has sent"
    });
});

module.exports = { createAdmin, adminForgotPassword }
