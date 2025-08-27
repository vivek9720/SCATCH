const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    return jwt.sigh({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;