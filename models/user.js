const { Schema, model } = require('mongoose');

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

module.exports = model('User', schema);