var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paqueteUsuarioSchema = new Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    paqueteId: { type: Schema.Types.ObjectId, ref: 'Paquete', required: true },
    created_at: { type: Date, default: Date.now() },
    finish_at: { type: Date, default: Date.now() },
    numClases: { type: Number, required: false }
}, { collection: 'paqueteUsuario' });
module.exports = mongoose.model('PaqueteUsuario', paqueteUsuarioSchema);