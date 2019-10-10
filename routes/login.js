var express = require('express');
//bcryot repositorio github
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Usuario = require('./../models/usuario');

var SEED = require('./../config/config').SEED;

router.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }
        //crear un token!!
        usuarioDB.password = '....';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 7000 });

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });


})



module.exports = router;