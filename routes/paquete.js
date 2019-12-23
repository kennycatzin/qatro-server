var express = require('express');
var router = express.Router();
var Paquete = require('./../models/paquete');



router.get('/admin/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Paquete.find({})
        .skip(desde)
        .limit(6)
        .exec(
            (err, paquetes) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando paquetes',
                        errors: err
                    });
                }
                Paquete.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        paquetes: paquetes,
                        numero: conteo
                    });
                })

            })
});
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Paquete.findById(id, (err, paquete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscar paquete',
                errors: err
            });
        }
        if (!paquete) {
            return res.status(400).json({
                ok: false,
                mensaje: 'paquete con el id' + id + 'no existe',
                errors: { message: 'no existe' }
            });
        }
        paquete.nombre = body.nombre;
        paquete.numeroClases = body.numeroClases;
        paquete.precioUnitario = body.precioUnitario;
        paquete.vigencia = body.vigencia;


        paquete.save((err, paqueteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar paquete',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                paquete: paqueteGuardado
            });
        });

    });

});
router.delete('/:id', (req, res) => {
    var id = req.params.id;

    Paquete.findByIdAndRemove(id, (err, paqueteBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar paquete',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            paquete: paqueteBorrado
        });
    });
});

router.get('/', (req, res, next) => {
    Paquete.find({})
        .exec(
            (err, paquetes) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando paquetes',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    paquetes: paquetes
                });
            })
});

router.post('/', (req, res) => {
    var body = req.body;
    var paquete = new Paquete({
        nombre: body.nombre,
        numeroClases: body.numeroClases,
        vigencia: body.vigencia,
        precioUnitario: body.precioUnitario,
        usuarioId: body.usuarioId

    });
    paquete.save((err, paqueteGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear paquete',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            paquete: paqueteGuardado,
            usuarioToken: req.paquete
        });
    });

});
module.exports = router;