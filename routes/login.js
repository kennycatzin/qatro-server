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
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.role)
        });
    });


})

function obtenerMenu( ROLE ) {
    var menu = [
        {
            titulo: 'Calendario',
            url: '/calendario'
          },
          {
            titulo: 'Coaches',
            url: '/coaches'
          },
          {
            titulo: 'Paquetes',
            url: '/paquetes'
          }
      ];

      var adminMenu = [
        {
            titulo: 'Calendario',
            url: '/admin_calendario'
          },
          {
            titulo: 'Coaches',
            url: '/admin_coaches'
          },
          {
            titulo: 'Disciplinas',
            url: '/admin_disciplinas'
          },
          {
            titulo: 'Paquetes',
            url: '/admin_paquetes'
          },
          {
            titulo: 'Usuarios',
            url: '/admin_usuarios'
          }
      ]
if ( ROLE === 'ADMIN_ROLE') {
    return adminMenu;
} 
    return menu;
}

module.exports = router;