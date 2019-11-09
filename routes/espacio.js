var express = require('express');
var app = express();
var Espacio = require('./../models/espacio');
var mdAutenticacion = require('./../middlewares/autenticacion');
var mongoose = require('mongoose'); +

app.post('/', (req, res, next) => {
    var body = req.body;
    for (var i = 0; i < body.espacios.lenght; i++) {
        for (var i = 0; i < body.espacios.columnas.lenght; i++) {
            body.espacios.columnas.push(columnas[i]);
        }
        body.espacios.push(espacios[i]);
    }
    var espacio = new Espacio({
        espacios: body.espacios
    });
    espacio.save((err, espacioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al establecer con los espacios',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuarioToken: 'req.calendario',
            espacio: espacioGuardado
        });
    });
});
module.exports = app;

// for (var i = 0; i < body.clases.espacios.lenght; i++) {
//     for (var i = 0; i < body.clases.espacios.columnas.lenght; i++) {
//         body.clases.espacios.columnas.push(columnas[i]);
//     }
//     body.clases.espacios.push(espacios[i]);
// }