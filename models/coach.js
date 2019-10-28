var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coachSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    alias: { type: String, required: [true, 'El alias requerido'] },
    frase: { type: String, required: [true, 'El objetivo es requerida'] },
    twitter: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    img: { type: String, required: false },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

module.exports = mongoose.model('Coach', coachSchema);