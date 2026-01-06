const jwt = require('jsonwebtoken');
const User = require('../models/users.js');

const getTokenData = (req, res) => {
    const encoded = req.header('Authorization').replace('Bearer ', '');
    if (!encoded) return res.status(401).json({ message: 'No token, authorization denied!...' });
    const decoded = jwt.verify(encoded, process.env.JWT_SECRET);
    return decoded;
};

exports.auth = async (req, res, next) => {
    try {
        const token = getTokenData(req, res);
        const user = await User.findById(token.id).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found, authentication failed!...' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid!...' });
    }
};