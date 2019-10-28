var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var disciplinaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre de la disciplina es requerido'] },
    descripcion: { type: String, required: [true, 'La descripción es requerida'] },
    img: { type: String, required: false },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);