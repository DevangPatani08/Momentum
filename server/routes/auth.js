const exp = require('express');
const { register, login, getMe } = require('../constrollers/auth.js');
const { auth } = require('../middleware/authMiddleware.js');

const r = exp.Router();

r.post('/register', register);
r.post('/login', login);
r.get('/me', auth, getMe);

module.exports = r;