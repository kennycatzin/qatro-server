var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var generoVálido = {
    values: ['FEMENINO', 'MASCULINO'],
    message: '{VALUE} no es un rol permitido'
}
var coachSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    apellidoPaterno: { type: String, required: [true, 'El apellido paterno es requerido'] },
    apellidoMaterno: { type: String, required: false },
    fechaNacimiento: { type: Date, required: [false, 'La fecha de nacimiento es requerido'] },
    direccion: { type: String, required: [true, 'La dirección es requerido'] },
    correo: { type: String, required: false },
    genero: { type: String, required: true, enum: generoVálido },
    alias: { type: String, required: [true, 'El alias requerido'] },
    frase: { type: String, required: [true, 'La frase es requerida'] },
    twitter: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    img: { type: String, required: false },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

module.exports = mongoose.model('Coach', coachSchema);