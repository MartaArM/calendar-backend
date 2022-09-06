const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // Va a ser una referencia a un objeto
        ref: 'Usuario', // Nombre del otro esquema
        required: true
    }
});

module.exports = model('Evento', EventoSchema);