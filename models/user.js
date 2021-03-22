const { Schema, model } = require('mongoose');
const emailValidator = require('../utils/EmailValidator');
const passwordValidator = require('../utils/PasswordValidator');

const schema = new Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.statics.isValidEmail = emailValidator;
schema.statics.isValidPassword = passwordValidator;

module.exports = model('User', schema);