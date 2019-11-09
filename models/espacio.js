var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var espacioSchema = new Schema({
    espacios: [{
        nombre: { type: String, required: true },
        posicion: { type: Number, required: false },
        columnas: [{
            nombre: { type: String, required: true },
            posicion: { type: String, required: true },
            color: { type: String, required: false },
            status: { type: String, required: true },
            tipo: { type: String, required: true },
            usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
        }]

    }]
}, { collection: 'espacio' });
module.exports = mongoose.model('Espacio', espacioSchema);