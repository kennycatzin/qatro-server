var express = require('express');
var app = express();
var fileupload = require('express-fileupload');
var Usuario = require('./../models/usuario');
// var Medico = require('./../models/medico');
// var Hospital = require('./../models/hospital');
var fs = require('fs');
app.use(fileupload());
//Rutas
app.put('/:tipo/:id', (req, res, next) => {
    var tipo = req.params.tipo;
    var id = req.params.id;

    //Tipos de coleccion
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Tipo de coleccion no es valida',
            errors: { message: 'Seleccione algo bien' }
        })
    }
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se ha seleccionado nada',
            errors: { message: 'Debe seleccionar una imagen' }
        })
    }
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

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
    var nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extensionArchivo}`;
    //Mover archivo
    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo'
            })
        }
        subirPorTipo(tipo, id, nombreArchivo, res)

    })

});

function subirPorTipo(tipo, id, nombreArchivo, res) {
    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {
            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'No existe el usuario',
                    errors: err

                });
            }
            var pathViejo = '/uploads/usuarios/' + usuario.img;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: true,
                        mensaje: 'Ha ocurrido un error al subir la imagen',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizado',
                    path: pathViejo,
                    usuarioActualizado: usuarioActualizado
                });
            });
        });
    }
    // if (tipo === 'medicos') {
    //     Medico.findById(id, (err, medico) => {
    //         if (!medico) {
    //             return res.status(400).json({
    //                 ok: true,
    //                 mensaje: 'No existe el medico',
    //                 errors: err

    //             });
    //         }
    //         var pathViejo = '/uploads/medicos/' + medico.pic;
    //         if (fs.existsSync(pathViejo)) {
    //             fs.unlink(pathViejo);
    //         }
    //         medico.pic = nombreArchivo;
    //         medico.save((err, medicoActualizado) => {
    //             if (err) {
    //                 return res.status(500).json({
    //                     ok: true,
    //                     mensaje: 'Ha ocurrido un error al subir la imagen',
    //                     errors: err
    //                 });
    //             }
    //             return res.status(200).json({
    //                 ok: true,
    //                 mensaje: 'Imagen de medico actualizado',
    //                 path: pathViejo,
    //                 medicoActualizado: medicoActualizado
    //             });
    //         });
    //     });
    // }
    // if (tipo === 'hospitales') {
    //     Hospital.findById(id, (err, hospital) => {
    //         if (!hospital) {
    //             return res.status(400).json({
    //                 ok: true,
    //                 mensaje: 'No existe el hospital',
    //                 errors: err

    //             });
    //         }
    //         var pathViejo = '/uploads/hospitales/' + hospital.pic;
    //         if (fs.existsSync(pathViejo)) {
    //             fs.unlink(pathViejo);
    //         }
    //         hospital.pic = nombreArchivo;
    //         hospital.save((err, hospitalActualizado) => {
    //             if (err) {
    //                 return res.status(500).json({
    //                     ok: true,
    //                     mensaje: 'Ha ocurrido un error al subir la imagen',
    //                     errors: err
    //                 });
    //             }
    //             return res.status(200).json({
    //                 ok: true,
    //                 mensaje: 'Imagen del hospital actualizado',
    //                 path: pathViejo,
    //                 hospitalActualizado: hospitalActualizado
    //             });
    //         });
    //     });
    // }
}

module.exports = app;