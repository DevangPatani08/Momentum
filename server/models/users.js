const mg = require('mongoose');
const b = require('bcryptjs');

const userSchema = new mg.Schema({
    firstName: { type: String, required: true, trim: true, maxLength: 100 },
    lastName: { type: String, required: true, trim: true, maxLength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await b.hash(this.password, await b.genSalt(10));
});

userSchema.methods.comparePassword = async function (pass) {
    if (!pass) return false;
    return (await b.compare(pass, this.password));
};

module.exports = mg.model('User', userSchema);