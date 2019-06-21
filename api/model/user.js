const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type:String,
        trim: true,
        required: true
    }
});

UserSchema.pre('save', (next) => {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);