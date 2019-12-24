var express = require('express');
var app = express();
var fileupload = require('express-fileupload');
var Coach = require('./../models/coach');

var fs = require('fs');
app.use(fileupload());


app.get('/', (req, res, next) => {
    Coach.find({}, 'nombre alias frase twitter facebook instagram img')
        .exec(
            (err, coaches) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando coaches',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    coaches: coaches
                });
            })
});
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Coach.findByIdAndRemove(id, (err, coachBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar coach',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            coach: coachBorrado
        });
    });
});
app.get('/admin/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Coach.find({})
        .skip(desde)
        .limit(6)
        .exec(
            (err, coaches) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando coaches',
                        errors: err
                    });
                }
                Coach.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        coaches: coaches,
                        numero: conteo
                    });
                })

            })
});
app.post('/', (req, res, next) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se ha seleccionado nada',
            errors: { message: 'Debe seleccionar una imagen' }
        })
    }
    var archivo = req.files.img;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];
    var name = req.body.alias;
    //extenciones
    var extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extencionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(403).json({
            ok: true,
            mensaje: 'Extencion no valida',
            errors: { message: 'solo se permiten: ' + extencionesValidas.join(', ') }
        });
    }
    //Nombre del archivo
    var nombreArchivo = `${name}-${ new Date().getMilliseconds() }.${extensionArchivo}`;
    //Mover archivo
    var path = `./uploads/coaches/${nombreArchivo}`;
    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo'
            })
        }
        subirPorTipo(req, nombreArchivo, res)

    })

});

function subirPorTipo(req, nombreArchivo, res) {
    var body = req.body;
    var coach = new Coach({
        nombre: body.nombre,
        apellidoPaterno: body.apellidoPaterno,
        apellidoMaterno: body.apellidoMaterno,
        sexo: body.sexo,
        fechaNacimiento: body.fechaNacimiento,
        direccion: body.direccion,
        correo: body.correo,
        alias: body.alias,
        frase: body.frase,
        twitter: body.twitter,
        facebook: body.facebook,
        instagram: body.instagram,
        img: nombreArchivo,
        usuario_id: body.usuario_id
    });
    coach.save((err, coachGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear coach',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            coach: coachGuardado,
            usuarioToken: req.coach
        });
    });

}
app.post('/nuevo/', (req, res) => {
    var body = req.body;
    var coach = new Coach({
        nombre: body.nombre,
        apellidoPaterno: body.apellidoPaterno,
        apellidoMaterno: body.apellidoMaterno,
        genero: body.genero,
        fechaNacimiento: body.fechaNacimiento,
        direccion: body.direccion,
        correo: body.correo,
        alias: body.alias,
        frase: body.frase,
        twitter: body.twitter,
        facebook: body.facebook,
        instagram: body.instagram,
        usuario_id: body.usuario_id
    });
    coach.save((err, coachGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear coach',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            coach: coachGuardado,
        });
    });
});

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Coach.findById(id, (err, coach) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscar coach',
                errors: err
            });
        }
        if (!coach) {
            return res.status(400).json({
                ok: false,
                mensaje: 'coach con el id' + id + 'no existe',
                errors: { message: 'no existe' }
            });
        }
        coach.nombre = body.nombre;
        coach.apellidoPaterno = body.apellidoPaterno;
        coach.apellidoMaterno = body.apellidoMaterno;
        coach.genero = body.genero;
        coach.fechaNacimiento = body.fechaNacimiento;
        coach.direccion = body.direccion;
        coach.correo = body.correo;
        coach.alias = body.alias;
        coach.frase = body.frase;
        coach.twitter = body.twitter;
        coach.facebook = body.facebook;
        coach.instagram = body.instagram;


        coach.save((err, coachGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar coach',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                coach: coachGuardado
            });
        });

    });

});

module.exports = app;