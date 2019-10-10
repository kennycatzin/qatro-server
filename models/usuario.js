var mongoos = require('mongoose');
var Schema = mongoos.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
    values: ['ADMIN_ROLE', 'SELLER_ROLE', 'CLIENT_ROLE', 'COACH_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

var usuarioSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, unique: true, required: [true, 'El correo es requerido'] },
    password: { type: String, required: [true, 'la contraseña es requerida'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'CLIENT_ROLE', enum: rolesValidos }
});
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoos.model('Usuario', usuarioSchema);