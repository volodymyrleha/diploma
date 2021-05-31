const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { type: String }
});

module.exports = {
    NoteSchema: schema,
    NoteModel: model('Note', schema)
};