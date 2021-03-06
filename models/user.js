const { Schema, model } = require('mongoose');
const { NoteSchema } = require('./note');
const { EventSchema } = require('./event');
const { TaskSchema } = require('./task');
const emailValidator = require('../utils/email-validator');
const passwordValidator = require('../utils/password-validator');

const schema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        default: null
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
    },
    notes: [ NoteSchema ],
    events: [ EventSchema ],
    tasks: [ TaskSchema ]
});

schema.statics.isValidEmail = emailValidator;
schema.statics.isValidPassword = passwordValidator;

module.exports = model('User', schema);