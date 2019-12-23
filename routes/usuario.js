var express = require('express');
//bcryot repositorio github
var bcrypt = require('bcryptjs');
var router = express.Router();
var Usuario = require('./../models/usuario');
var jwt = require('jsonwebtoken');

var mdAuth = require('./../middlewares/autenticacion');


// Obtener todos los usuarios
router.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Usuario.find({})
        .skip(desde)
        .limit(6)
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        numero: conteo
                    });
                })

            })

});


//Actualizar usuario
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
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
        usuario.name = body.name;
        usuario.apellidoPaterno = body.apellidoPaterno;
        usuario.apellidoMaterno = body.apellidoMaterno;
        usuario.fechaNacimiento = body.fechaNacimiento;
        usuario.genero = body.genero;
        usuario.role = body.role;
        usuario.telefono = body.telefono;
        usuario.img = body.img;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });

    });

});



// Crear nuevo usuario
router.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        name: body.name,
        apellidoPaterno: body.apellidoPaterno,
        apellidoMaterno: body.apellidoMaterno,
        fechaNacimiento: body.fechaNacimiento,
        genero: body.genero,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        telefono: body.telefono
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario,
            menu: obtenerMenu(usuarioGuardado.role)
        });
    });

});

// Eliminar un usuario

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});



function obtenerMenu(ROLE) {
    var menu = [{
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

    var adminMenu = [{
            titulo: 'Calendario',
            url: '/admin_calendario'
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
    if (ROLE === 'ADMIN_ROLE') {
        return adminMenu;
    }
    return menu;
}
module.exports = router;