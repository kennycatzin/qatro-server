var express = require('express');
//bcryot repositorio github
var router = express.Router();
var jwt = require('jsonwebtoken');
var SEED = require('./../config/config').SEED;
//verificar token
exports.verificaToken = function(req, res, next) {

        var token = req.query.token;
        jwt.verify(token, SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'token incorrecto',
                    errors: err
                });
            }
            req.usuario = decoded.usuario;
            next();

        })
    }
    //Verifica Admin
exports.verificaAdmin = function(req, res, next) {

    var usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Permiso denegado',
            errors: { message: 'No es un administrador' }
        });

    }
}