const exp = require('express');
const { getTasks, makeTask, updateTask, delTask, toggleStatus } = require('../constrollers/tasks.js');
const { auth } = require('../middleware/authMiddleware.js'); 

const r = exp.Router();

r.get('/', auth, getTasks);
r.post('/', auth, makeTask);
r.put('/:id', auth, updateTask);
r.delete('/:id', auth, delTask);
r.patch('/:id/toggle', auth, toggleStatus);

module.exports = r;