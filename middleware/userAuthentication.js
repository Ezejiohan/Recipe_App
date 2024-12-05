const jwt = require('jsonwebtoken'); 
const User = require('../models/user');
const asyncWrapper = require('./async'); 
const { createCustomError } = require('../errors/custom_error'); 

// Middleware function to authenticate the admin
const userAuthenticate = asyncWrapper(async (req, res, next) => {
    // Check if the Authorization header is present in the request
    const hasAuthorization = req.headers.authorization;
    if (!hasAuthorization) {
        // If no Authorization header is found, respond with a 400 status code
        return res.status(400).json({ msg: 'Authorization not found' });
    }

    // Extract the token from the Authorization header
    const token = hasAuthorization.split(' ')[1];

    // Verify the token using the secret key from the environment variables
    const decodedToken = jwt.verify(token, process.env.TOKEN);

    // Find the user in the database using the ID from the decoded token
    const user = await User.findById(decodedToken.id);
    if (!user) {
        // If the user is not found, throw a custom error with a 404 status code
        return next(createCustomError("User not found", 404));
    }

    // Attach the decoded token (user information) to the request object
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();

});

// Export the authenticate middleware for use in other parts of the application
module.exports = { userAuthenticate };