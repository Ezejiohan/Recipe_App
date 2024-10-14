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
 const userLogin = asyncWrapper(async (req, res, next) => {
    const userLoginRequest = { email: req.body.email, password: req.body.password };
    const user = await fetchUser({ email: req.body.email });
    if (!user) {
        return next(createCustomError("User not found", 404));
    }

    const correctPassword = await bcrypt.compare(userLoginRequest.password, user.password );
    if (correctPassword === false) {
        return next(createCustomError('Invalid email or password', 404));
    }
    const generatedToken = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.TOKEN, { expiresIn: '12h' });
    const result = {
        id: user._id,
        email: user.email,
        token: generatedToken
    }
    return res.status(200).json({ msg: "userLogin successful", result });
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
        return next(createCustomError("Password incorrect", 404));
    }
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, saltPassword);
    if (newPassword === oldPassword) {
        return next(createCustomError("Password are similar", 404));
    }
    user.password = hashPassword
    /*sendEmail({
        email: user.email,
        subject: "Password change alert",
        message: "You have changed your password. If not you alert us"
    });*/
    const result = {
        fullname: user.fullname,
        email: user.email
    }
    await user.save();

    return res.status(200).json({ msg: "Password changed successful", result });
});

module.exports = { createUser, 
    userLogin,
    changeUserPassword
}