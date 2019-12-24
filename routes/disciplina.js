var express = require('express');
var app = express();
var fileupload = require('express-fileupload');
var Disciplina = require('./../models/disciplina');



var fs = require('fs');
app.use(fileupload());

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Disciplina.find({}, 'nombre descripcion img tipo')
        .skip(desde)
        .limit(6)
        .exec(
            (err, disciplinas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando disciplinas',
                        errors: err
                    });
                }
                Disciplina.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        disciplinas: disciplinas,
                        numero: conteo


                    });
                })
            })
});
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Disciplina.findByIdAndRemove(id, (err, disciplinaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar disciplina',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            disciplina: disciplinaBorrado
        });
    });
});
app.post('/', (req, res) => {

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
    var name = req.body.nombre;
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
    var path = `./uploads/disciplinas/${nombreArchivo}`;
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
    var disciplina = new Disciplina({
        nombre: body.nombre,
        descripcion: body.descripcion,
        tipo: body.tipo,
        img: nombreArchivo,
        usuario_id: body.usuario_id

    });
    disciplina.save((err, disciplinaGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear la disciplina',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            disciplina: disciplinaGuardada,
            usuarioToken: req.disciplina
        });
    });

}

// Crear nuevo usuario
app.post('/nuevo/', (req, res) => {
    var body = req.body;
    var disciplina = new Disciplina({
        nombre: body.nombre,
        descripcion: body.descripcion,
        tipo: body.tipo,
        img: "xxx.jpg",
        usuario_id: body.usuario_id

    });
    disciplina.save((err, disciplinaGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear la disciplina',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            disciplina: disciplinaGuardada,
            usuarioToken: req.disciplina
        });
    });

});

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Disciplina.findById(id, (err, disciplina) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscar disciplina',
                errors: err
            });
        }
        if (!disciplina) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La disciplina con el id' + id + 'no existe',
                errors: { message: 'no existe' }
            });
        }
        disciplina.nombre = body.nombre;
        disciplina.descripcion = body.descripcion;
        disciplina.tipo = body.tipo;

        disciplina.save((err, disciplinaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar disciplina',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                disciplina: disciplinaGuardado
            });
        });

    });

});



module.exports = app;