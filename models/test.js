var mongoos = require('mongoose');
var Schema = mongoos.Schema;


var testSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    img: { type: String, required: false }
});

module.exports = mongoos.model('Test', testSchema);