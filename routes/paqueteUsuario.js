var express = require('express');
var app = express();
var PaqueteUsuario = require('./../models/paqueteUsuario')
var mdAutenticacion = require('./../middlewares/autenticacion');
var ObjectID = require("mongodb").ObjectID;

//Rutas
app.get('/', (req, res, next) => {
    // 'fecha': { $gte: '2019-08-12', $lte: '2019-08-13' }
    PaqueteUsuario.find({})
        .populate('usuarioId', 'nombre')
        .exec(
            (err, paqusuario) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Ha ocurrido un error inesperado',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    paqusuario: paqusuario
                });
            });
});

app.get('/numero/:id', (req, res, next) => {
    var id = req.params.id;
    var userid = new ObjectID(id);
    var fechaHoy = new Date;
    fecha = Date.now();
    console.log(userid);

    PaqueteUsuario.estimatedDocumentCount({ "usuarioId": userid }, (err, conteo) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscar por usuario',
                errors: err
            });
        }
        console.log('conteo ' + conteo);
        if (conteo === 0) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscar, Debe cargar un paquete',
                errors: err
            });
        } else {
            PaqueteUsuario.aggregate(
                [{ $match: { "usuarioId": userid } },
                    {
                        $project: {
                            _id: null,
                            clasesDisponibles: {
                                $cond: [{ $gte: ["$finish_at", fechaHoy] }, { $sum: "$numClases" }, 0]
                            },
                            fecha: {
                                $dateToString: { format: "%Y-%m-%d", date: "$finish_at" }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum: "$clasesDisponibles"
                            },
                            fecha: {
                                $max: "$fecha"
                            }
                        }
                    }
                ], (err, paqusuario) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Ha ocurrido un error inesperado',
                            errors: err
                        });
                    }
                    console.log(paqusuario);
                    res.status(200).json({
                        ok: true,
                        total: paqusuario[0].total,
                        fecha: paqusuario[0].fecha
                    });
                });
        }
    })






});
app.post('/', (req, res, next) => {
    var body = req.body;
    var paqueteUsuario = new PaqueteUsuario({
        usuarioId: body.usuarioId,
        paqueteId: body.paqueteId,
        created_at: Date.now(),
        finish_at: body.finish_at,
        numClases: body.numClases
    });
    paqueteUsuario.save((err, paqueteUsuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al establecer con el paqueteUsuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuarioToken: 'req.paqueteUsuario',
            paqueteUsuario: paqueteUsuarioGuardado
        });
    });
});


module.exports = app;