var express = require('express');
var app = express();
var Calendario = require('./../models/calendario');
var PaqueteUsuario = require('./../models/paqueteUsuario');
var mdAutenticacion = require('./../middlewares/autenticacion');
var mongoose = require('mongoose');
var EmailCtrl = require('./mailCtrl');
var Usuario = require('./../models/usuario');

//Rutas
app.get('/', (req, res, next) => {
   var limite = new Date();
   limite = Date.now();
    Calendario.find({})
        .populate('clases.disciplina_id', 'nombre img')
        .populate('clases.coach_id', 'alias img')

    .exec(
        (err, calendario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error inesperado',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                calendario: calendario
            });
        });
});
app.get('/portipo/:tipo/:id', (req, res, next) => {
    var id = req.params.id;
    var tipo = req.params.tipo;
    var tiposValidos = ['coach_id', 'disciplina_id'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Tipo de coleccion no es valida',
            errors: { message: 'Seleccione algo bien' }
        })
    }
    if (tipo === 'disciplina_id') {
        Calendario.find({ 'clases.disciplina_id': id })
            .populate('clases.disciplina_id', 'nombre')
            .populate('clases.coach_id', 'alias')

        .exec(
            (err, calendario) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Ha ocurrido un error inesperado',
                        errors: err
                    });
                }
                if (!calendario) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El calendario con el id ' + id + ' no existe',
                        errors: { message: 'no existe' }
                    });
                }

                res.status(200).json({
                    ok: true,
                    calendario: calendario
                });
            });
    }
    if (tipo === 'coach_id') {
        Calendario.find({ 'clases.coach_id': id })
            .populate('clases.disciplina_id', 'nombre')
            .populate('clases.coach_id', 'alias')
            .exec(
                (err, calendario) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Ha ocurrido un error inesperado',
                            errors: err
                        });
                    }
                    if (!calendario) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'El calendario con el id ' + id + ' no existe',
                            errors: { message: 'no existe' }
                        });
                    }

                    res.status(200).json({
                        ok: true,
                        calendario: calendario
                    });
                });
    }
});
app.get('/porclase/:id', (req, res) => {
    var id = req.params.id;
    Calendario.find({ 'clases._id': id }, { "clases.$": 1, "_id": 0 })
        .populate('clases.disciplina_id', 'nombre img')
        .populate('clases.coach_id', 'alias img')
        .exec(
            (err, calendarioEncontrado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "Error al buscar el calendario"
                    });
                }
                if (!calendarioEncontrado) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El calendario con el id ' + id + ' no existe',
                        errors: { message: 'no existe' }
                    });
                }
                res.status(201).json({
                    ok: true,
                    calendario: calendarioEncontrado
                });
            });
});
app.post('/', (req, res, next) => {
    var body = req.body;
    for (var i = 0; i < body.clases.lenght; i++) {
        for (var i = 0; i < body.clases.espacios.lenght; i++) {
            for (var i = 0; i < body.clases.espacios.columnas.lenght; i++) {
                body.clases.espacios.columnas.push(columnas[i]);
            }
            body.clases.espacios.push(espacios[i]);
        }
        body.clases.push(clases[i]);
    }
    var calendario = new Calendario({
        dia: body.dia,
        fecha: body.fecha,
        clases: body.clases,
        usuario_id: body.usuario_id
    });
    calendario.save((err, calendarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al establecer con el calendario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuarioToken: 'req.calendario',
            calendario: calendarioGuardado
        });
    });
});
app.put('/actualizar', (req, res) => {
    var body = req.body;
    var claseId = body.claseId;
    var espacioId = body.espacioId;
    var columnaId = body.columnaId;
    var usuarioId = body.usuarioId;
    var espacio = body.espacio;
    var columna = body.columna;
    var clasesDisp = body.clasesDisp;
    if (clasesDisp <= 0) {
        return res.status(400).json({
            ok: false,
            message: 'No cuenta con clases disponibles'
        });
    }
    espacio = parseInt(espacio);
    columna = parseInt(columna);
    var newvalues = { $set: { "clases.$.espacios.1.columnas.1.usuario_id": usuarioId, "clases.$.espacios.1.columnas.1.status": 0, "clases.$.espacios.1.columnas.1.color": "disabled" } };
    switch (espacio) {

        case 1:
            switch (columna) {
                case 1:
                    newvalues = { $set: { "clases.$.espacios.0.columnas.0.usuario_id": usuarioId, "clases.$.espacios.0.columnas.0.status": 0, "clases.$.espacios.0.columnas.0.color": "disabled" } };
                    break;
                case 2:
                    newvalues = { $set: { "clases.$.espacios.0.columnas.1.usuario_id": usuarioId, "clases.$.espacios.0.columnas.1.status": 0, "clases.$.espacios.0.columnas.1.color": "disabled" } };
                    break;
            }
            break;

        case 2:
            switch (columna) {
                case 1:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.0.usuario_id": usuarioId, "clases.$.espacios.1.columnas.0.status": 0, "clases.$.espacios.1.columnas.0.color": "disabled" } };
                    break;
                case 2:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.1.usuario_id": usuarioId, "clases.$.espacios.1.columnas.1.status": 0, "clases.$.espacios.1.columnas.1.color": "disabled" } };
                    break;
                case 3:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.2.usuario_id": usuarioId, "clases.$.espacios.1.columnas.2.status": 0, "clases.$.espacios.1.columnas.2.color": "disabled" } };
                    break;
                case 4:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.3.usuario_id": usuarioId, "clases.$.espacios.1.columnas.3.status": 0, "clases.$.espacios.1.columnas.3.color": "disabled" } };
                    break;
                case 5:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.4.usuario_id": usuarioId, "clases.$.espacios.1.columnas.4.status": 0, "clases.$.espacios.1.columnas.4.color": "disabled" } };
                    break;
                case 6:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.5.usuario_id": usuarioId, "clases.$.espacios.1.columnas.5.status": 0, "clases.$.espacios.1.columnas.5.color": "disabled" } };
                    break;
                case 7:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.6.usuario_id": usuarioId, "clases.$.espacios.1.columnas.6.status": 0, "clases.$.espacios.1.columnas.6.color": "disabled" } };
                    break;
                case 8:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.7.usuario_id": usuarioId, "clases.$.espacios.1.columnas.7.status": 0, "clases.$.espacios.1.columnas.7.color": "disabled" } };
                    break;
                case 9:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.8.usuario_id": usuarioId, "clases.$.espacios.1.columnas.8.status": 0, "clases.$.espacios.1.columnas.8.color": "disabled" } };
                    break;
                case 10:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.9.usuario_id": usuarioId, "clases.$.espacios.1.columnas.9.status": 0, "clases.$.espacios.1.columnas.9.color": "disabled" } };
                    break;
                case 11:
                    newvalues = { $set: { "clases.$.espacios.1.columnas.10.usuario_id": usuarioId, "clases.$.espacios.1.columnas.10.status": 0, "clases.$.espacios.1.columnas.10.color": "disabled" } };
            }
            break;
        case 3:
            switch (columna) {
                case 1:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.0.usuario_id": usuarioId, "clases.$.espacios.2.columnas.0.status": 0, "clases.$.espacios.2.columnas.0.color": "disabled" } };
                    break;
                case 2:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.1.usuario_id": usuarioId, "clases.$.espacios.2.columnas.1.status": 0, "clases.$.espacios.2.columnas.1.color": "disabled" } };
                    break;
                case 2:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.2.usuario_id": usuarioId, "clases.$.espacios.2.columnas.2.status": 0, "clases.$.espacios.2.columnas.2.color": "disabled" } };
                    break;
                case 3:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.3.usuario_id": usuarioId, "clases.$.espacios.2.columnas.3.status": 0, "clases.$.espacios.2.columnas.3.color": "disabled" } };
                    break;
                case 5:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.4.usuario_id": usuarioId, "clases.$.espacios.2.columnas.4.status": 0, "clases.$.espacios.2.columnas.4.color": "disabled" } };
                    break;
                case 6:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.5.usuario_id": usuarioId, "clases.$.espacios.2.columnas.5.status": 0, "clases.$.espacios.2.columnas.5.color": "disabled" } };
                    break;
                case 7:
                    newvalues = { $set: { "clases.$.espacios.2.columnas.6.usuario_id": usuarioId, "clases.$.espacios.2.columnas.6.status": 0, "clases.$.espacios.2.columnas.6.color": "disabled" } };
                    break;
            }
            break;
    }
    restarClase(usuarioId)
    console.log(newvalues);
    console.log(espacio);
    console.log(columna);

    var myquery = {

        'clases._id': claseId,
        'clases.espacios._id': espacioId,
        'clases.espacios.columnas._id': columnaId
    };
    Calendario.find({ 'clases._id': claseId }, { '_id': false, 'dia': true, 'fecha': true, 'clases': { $elemMatch: { '_id': claseId } } })
        .populate('clases.disciplina_id', 'nombre')
        .populate('clases.coach_id', 'alias')
        .exec(
            (err, calendarioEncontrado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "Error al buscar el calendario"
                    });
                }
                if (!calendarioEncontrado) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El calendario con el id ' + claseId + ' no existe',
                        errors: { message: 'no existe' }
                    });
                }
                console.log('mi objeto:  ');
                console.log(calendarioEncontrado);
                Usuario.findById(usuarioId, (err, usuario) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error buscar usuario',
                            errors: err
                        });
                    }
                    if (!usuario) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'El usuario con el id' + id + 'no existe',
                            errors: { message: 'no existe' }
                        });
                    }
                    console.log(usuario);
                    calendarioEncontrado.push({emailUser: usuario.email});
                    console.log('aquii mirameeee');

                console.log(calendarioEncontrado);

                EmailCtrl.sendEmail(calendarioEncontrado);
            
                });
                
            });
    Calendario.updateOne(myquery, newvalues).exec(
        (err, calendario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error inesperado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                calendario: calendario
            });
        });
});


function restarClase(id) {
    var obj = [];
    var newvalues = {
        $inc: {
            "numClases": -1
        }
    };
    var myquery = {};
    PaqueteUsuario.find({
            $and: [
                { "usuarioId": id },
                { "numClases": { $gt: 0 } }
            ]
        })
        .sort({ "finish_at": 1 })
        .exec(
            (err, paqUsuario) => {
                if (err) {
                    console.log('muyyyy mal 1');

                }
                if (!paqUsuario) {
                    console.log("No existe");

                }
                console.log(paqUsuario);
                myquery = { "_id": paqUsuario[0]._id };
                console.log(myquery);
                PaqueteUsuario.updateOne(myquery, newvalues).exec(
                    (err, calendario) => {
                        if (err) {
                            console.log('muyyyy mal');
                        }

                        console.log("correctisimo");
                    });

            });
    return true;
}
module.exports = app;
