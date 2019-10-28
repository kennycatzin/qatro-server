var express = require('express');
var app = express();
var fileupload = require('express-fileupload');
var Test = require('./../models/test');

var fs = require('fs');
app.use(fileupload());
//Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: ' Peticion realizada correctamente'
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


    // var pathViejo = '/uploads/coaches/' + req.pic;
    // if (fs.existsSync(pathViejo)) {
    //     fs.unlink(pathViejo);
    // }
    var body = req.body;
    var test = new Test({
        nombre: body.nombre,
        img: nombreArchivo
    });
    test.save((err, testGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Ha ocurrido un error al subir la imagen',
                errors: err
            });
        }
        return res.status(200).json({
            ok: true,
            mensaje: 'Imagen de test guardado',
            testGuardado: testGuardado
        });
    });




}

module.exports = app;