const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number
    }
});

module.exports = {
    EventSchema: schema,
    EventModel: model('Event', schema)
};