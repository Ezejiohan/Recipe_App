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

module.exports = { createUser, userLogin }