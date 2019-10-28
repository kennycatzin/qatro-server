var express = require('express');
var router = express.Router();
var Paquete = require('./../models/paquete');
router.get('/', (req, res, next) => {
    Paquete.find({}, 'num_clases precio_unit vigencia')
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
        num_clases: body.num_clases,
        vigencia: body.vigencia,
        precio_unit: body.precio_unit,
        usuario_id: body.usuario_id

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