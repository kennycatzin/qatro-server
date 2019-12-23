var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calendarioSchema = new Schema({
    dia: { type: String, required: [true, 'El dia es requerido'] },
    fecha: { type: Date, unique: true, required: [true, 'La fecha es requerida'], default: Date.now },
    clases: [{
        disciplinaId: { type: Schema.Types.ObjectId, ref: 'Disciplina', required: [true, 'La disciplina es obligatoria'] },
        coachId: { type: Schema.Types.ObjectId, ref: 'Coach', required: [true, 'El coach es obligatorio'] },
        horario: { type: String, required: false },
        icono: { type: String, required: false, default: 'fa fa-map-marker' },
        espacios: [{
            posicion: { type: Number, required: true },
            nombre: { type: String, required: false },
            columnas: [{
                nombre: { type: String, required: false },
                fila: { type: Number, required: false },
                color: { type: String, required: false },
                posicion: { type: Number, required: false },
                status: { type: Number, required: false },
                tipo: { type: Number, required: false },
                usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
            }]
        }]
    }],
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }

}, { collection: 'calendario' });
module.exports = mongoose.model('Calendario', calendarioSchema);