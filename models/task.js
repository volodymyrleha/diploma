const { Schema, model } = require('mongoose');

/**
 * LABEL STATES
 * 0 - NOT STARTED
 * 1 - IN PROGRESS
 * 2 - DONE
 */

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    deadline: {
        type: Date
    },
    state: {
        type: Number,        
        required: true,
        default: 0,
    },
    labels: [String]
});

module.exports = {
    TaskSchema: schema,
    TaskModel: model('Task', schema)
};