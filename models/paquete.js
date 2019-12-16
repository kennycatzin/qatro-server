var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paqueteSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    numeroClases: { type: Number, required: [true, 'El número de clase es requerido'] },
    precioUnitario: { type: Number, required: [true, 'El precio es requerido'] },
    vigencia: { type: Number, required: [true, 'La vigencia es requerida'] },
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

module.exports = mongoose.model('Paquete', paqueteSchema);