const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');
const { fetchUser, registerUser } = require('../repository/user');

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

const userForgotPassword = asyncWrapper(async (req, res, next) => {
    const user = await fetchUser({ email: req.body.email });
    if (!user) {
        return next(createCustomError('User not found', 404));
    }
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.TOKEN)

    const passwordChangeLink = `${req.protocol}://${req.get("host")}/userss/change_password/${user._id}/${token}`;
    const message = `Click this link: ${passwordChangeLink} to set a new password`;

    sendEmail({
        email: user.email,
        subject: 'Forget password link',
        message: message
    });

    res.status(200).json({
        message: "Email has been sent"
    });
});

module.exports = { createUser, 
    userForgotPassword 
}
