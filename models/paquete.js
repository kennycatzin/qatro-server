var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paqueteSchema = new Schema({
    num_clases: { type: Number, required: [true, 'El número de clase es requerido'] },
    precio_unit: { type: Number, required: [true, 'El precio es requerido'] },
    vigencia: { type: Number, required: [true, 'La vigencia es requerida'] },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

module.exports = mongoose.model('Paquete', paqueteSchema);