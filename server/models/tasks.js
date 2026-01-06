const mg = require('mongoose');

const taskSchema = new mg.Schema({
    message: { type: String, required: true, trim: true, unique: true, maxLength: 500 },
    priority: { type: String, enum: ['right-now', 'on-convenience', 'complete-later'], default: 'on-convenience' },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    userId: { type: mg.Schema.Types.ObjectId, ref: 'User', required: true }    
}, { timestamps: true });

taskSchema.index({ completed: 1, completedAt: 1 }, {expireAfterSeconds: 30 * 24 * 60 * 60 * 1000});

module.exports = mg.model('Task', taskSchema);