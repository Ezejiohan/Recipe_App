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
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, saltPassword);

    const newAdmin = await registerAdmin({
        firstname,
        lastname,
        email,
        password: hashPassword
    })

    res.status(201).json({ msg: 'Admin created successfully', admin: newAdmin });
});

const adminLogin = asyncWrapper(async (req, res, next) => {
    const loginRequest = { email: req.body.email, password: req.body.password }
    const admin = await fetchAdmin({ email: req.body.email });
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
        }, process.env.TOKEN, { expiresIn: '12h' });
        const result = {
            id: admin._id,
            email: admin.email,
            token: generatedToken
        }
        return res.status(200).json({ result });
    }
});

const adminResetPassword = asyncWrapper(async (req, res, next) => {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;
    const admin = await Admin.findById(req.params.id)
    if (!admin) {
        return next(createCustomError("Admin not found", 404))
    }
    await jwt.verify(token, secretKey);
    if (newPassword !== confirmPassword) {
        return next(createCustomError("There is a differences in both password", 403))
    }
    const saltPassword = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(newPassword, saltPassword)

    const updatePassword = await Admin.findByIdAndUpdate(req.params.id, {
        password: hashPassword
    });

    await admin.save();

    res.status(200).json({updatePassword})
})

module.exports = { createAdmin,
    adminResetPassword,
    adminLogin
 }
