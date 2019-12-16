var express = require('express');
var app = express();
// var Hospital = require('./../models/hospital');
// var Medico = require('./../models/medico');
var Usuario = require('./../models/usuario');
var Paquete = require('./../models/paquete');

//Rutas
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa = '';
    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuario(busqueda, regex);
            break;
        case 'paquetes':
            console.log('ya llegue');
            promesa = buscarPaquete(busqueda, regex);
            break;
            // case 'medicos':
            //     promesa = buscarMedicos(busqueda, regex);
            //     break;
        default:
            return res.status(400).json({
                ok: false,
                message: 'No existe esa coleccion',
                error: { message: 'Tipo de tabla/coleccion no valido' }
            });

    }
    promesa.then(data => {
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    })
});

app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;

    Promise.all([
            // buscarHospitales(busqueda, regex),
            buscarPaquete(busqueda, regex),
            buscarUsuario(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                paquete: respuestas[0],
                usuarios: respuestas[1]
            });
        });

});





// function buscarHospitales(busqueda, regex) {
//     return new Promise((resolve, reject) => {
//         Hospital.find({ nombre: regex })
//             .populate('usuario_id')
//             .exec(
//                 (err, hospitales) => {
//                     if (err) {
//                         reject('Error al cargar hosipitales', err);
//                     } else {
//                         resolve(hospitales)
//                     }
//                 });
//     });
// }

function buscarUsuario(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, 'name email role img fechaNacimiento')
            .or([{ 'name': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }

            })

    });
}

function buscarPaquete(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Paquete.find({})
            .or([{ 'nombre': regex }])
            .exec((err, paquetes) => {
                if (err) {
                    reject('Error al cargar paquetes', err);
                } else {
                    resolve(paquetes);
                }

            })

    });
}

// function buscarMedicos(busqueda, regex) {
//     return new Promise((resolve, reject) => {
//         Medico.find({ nombre: regex })
//             .populate('usuario_id')
//             .exec(
//                 (err, medico) => {
//                     if (err) {
//                         reject('Error al cargar medicos', err);
//                     } else {
//                         resolve(medico)
//                     }
//                 });
//     });

// }
module.exports = app;