var express = require('express');
var app = express();
var Calendario = require('./../models/calendario');
var Coach = require('./../models/coach');
var Disciplina = require('./../models/disciplina');
var mdAutenticacion = require('./../middlewares/autenticacion');
var mongoose = require('mongoose');

//Rutas
app.get('/', (req, res, next) => {
    // 'fecha': { $gte: '2019-08-12', $lte: '2019-08-13' }
    Calendario.find({ })
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
    if (tipo==='disciplina_id'){
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
     if(tipo==='coach_id') {
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
    Calendario.find({'clases._id': id},{"clases.$": 1, "_id":0})
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
module.exports = app;