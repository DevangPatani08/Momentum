    const jwt = require('jsonwebtoken');
    const User = require('../models/users.js');

    const genToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    };

    exports.register = async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            let user = await User.findOne({ $or: [{ email }, { firstName }, { lastName }] });

            if (user) return res.status(400).json({ message: 'User already exisits!...' });

            user = new User({ firstName, lastName, email, password });
            await user.save();

            const token = genToken(user._id);

            res.status(201).json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server error while user registration!...' });
        }
    };

    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'Authentication Failed: invalid credentials!...' });

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(400).json({ message: 'Authentication Failed: invalid password!...' });

            const token = genToken(user._id);
            
            res.status(201).json({ token, user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server error while user login!...' });
        }
    };

    exports.getMe = async (req, res) => res.status(200).json({ user: { id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName } });