var nodemailer = require('nodemailer');
var tipo = '';

exports.disparar = function(vari) {
    tipo = vari;
    this.sendEmail();
}
function formatDate(date) {
    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "May0", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }


exports.sendEmail = function(req, res) {
    // Definimos el transporter
    var req2 = req[0];
    var req1 = req[1];
    var userMail = req[1].emailUser; 
    var username = 'kenny';
    var password = '12345';
    console.log(req);
    var dia = req2.dia;
    var horario = req2.clases[0].horario;
    var fecha = req2.fecha;
    var hoy = new Date();
    var dis = req2.clases[0].disciplina_id.nombre;
    console.log(dis);
    console.log(horario);
    console.log(dia);
    console.log(userMail);
    hoy = formatDate(hoy);
fecha = formatDate(fecha);
    console.log('llegueeeee');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'kenn2506@gmail.com',
            pass: 'calapul2506'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'kennycatzin@gmail.com',
        to: userMail,
        subject: 'Confirmación de clase',
        text: 'Contenido del email',
        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
            '<html xmlns:v="urn:schemas-microsoft-com:vml">' +
            '<head>' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
            '    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />' +
            '    <meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">' +
            '    <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700" rel="stylesheet">' +
            '    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700" rel="stylesheet">' +
            '    <title>Material Design for Bootstrap</title>' +
            '    <style type="text/css">' +
            '        body {' +
            '            width: 100%;' +
            '            background-color: #ffffff;' +
            '            margin: 0;' +
            '            padding: 0;' +
            '            -webkit-font-smoothing: antialiased;' +
            '            mso-margin-top-alt: 0px;' +
            '            mso-margin-bottom-alt: 0px;' +
            '            mso-padding-alt: 0px 0px 0px 0px;' +
            '        }' +
            '        p,' +
            '        h1,' +
            '        h2,' +
            '        h3,' +
            '        h4 {' +
            '            margin-top: 0;' +
            '            margin-bottom: 0;' +
            '            padding-top: 0;' +
            '            padding-bottom: 0;' +
            '        }       ' +
            '        span.preheader {' +
            '            display: none;' +
            '            font-size: 1px;' +
            '        }       ' +
            '        html {' +
            '            width: 100%;' +
            '        }        ' +
            '        table {' +
            '            font-size: 14px;' +
            '            border: 0;' +
            '        }      ' +
            '        @media only screen and (max-width: 640px) {' +
            '            .main-header {' +
            '                font-size: 20px !important;' +
            '            }' +
            '            .main-section-header {' +
            '                font-size: 28px !important;' +
            '            }' +
            '            .show {' +
            '                display: block !important;' +
            '            }' +
            '            .hide {' +
            '                display: none !important;' +
            '            }' +
            '            .align-center {' +
            '                text-align: center !important;' +
            '            }' +
            '            .no-bg {' +
            '                background: none !important;' +
            '            }' +
            '            .main-image img {' +
            '                width: 440px !important;' +
            '                height: auto !important;' +
            '            }' +
            '            .divider img {' +
            '                width: 440px !important;' +
            '            }' +
            '            .container590 {' +
            '                width: 440px !important;' +
            '            }' +
            '            .container580 {' +
            '                width: 400px !important;' +
            '            }' +
            '            .main-button {' +
            '                width: 220px !important;' +
            '            }' +
            '            .section-img img {' +
            '                width: 320px !important;' +
            '                height: auto !important;' +
            '            }' +
            '            .team-img img {' +
            '                width: 100% !important;' +
            '                height: auto !important;' +
            '            }' +
            '        }' +
            '        @media only screen and (max-width: 479px) {' +
            '            .main-header {' +
            '                font-size: 18px !important;' +
            '            }' +
            '            .main-section-header {' +
            '                font-size: 26px !important;' +
            '            }' +
            '            .divider img {' +
            '                width: 280px !important;' +
            '            }' +
            '            .container590 {' +
            '                width: 280px !important;' +
            '            }' +
            '            .container590 {' +
            '                width: 280px !important;' +
            '            }' +
            '            .container580 {' +
            '                width: 260px !important;' +
            '            }' +
            '            .section-img img {' +
            '                width: 280px !important;' +
            '                height: auto !important;' +
            '            }' +
            '        }' +
            '    </style>' +
            '</head>' +
            '<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">' +
            '    <table style="display:none!important;">' +
            '        <tr>' +
            '            <td>' +
            '                <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">' +
            '                   <strong> Registro exitoso Qatro Fit </strong>' +
            '                </div>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">' +
            '        <tr>' +
            '            <td align="center">' +
            '                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">' +
            '                    <tr>' +
            '                        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td align="center">' +
            '                            <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">' +
            '                                <tr>' +
            '                                    <td align="center" height="70" style="height:70px;">' +
            '                                        <a href="https://qatro.fit/" style="display: block; border-style: none !important; border: 0 !important;"><img width="100" border="0" style="display: block; width: 100px;" src="https://qatro-server.herokuapp.com/assets/proyecto/logoqatro.png" alt="" /></a>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">' +
            '        <tr>' +
            '            <td align="center">' +
            '                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">' +
                                '<tr>' +
            '                        <td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">' +
            '                            <div style="line-height: 35px">' +
            '                                <span style="color: #EE784A;">'+ dis +'</span>' +
            '                            </div>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '' +
            '                        <td align="center" class="section-img">' +
            '                            <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://qatro-server.herokuapp.com/assets/proyecto/vector.jpg" style="display: block; width: 590px;" width="590" border="0" alt="" /></a>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">' +
            '                            <div style="line-height: 35px">' +
            '                                '+ dia +' '+ fecha +' <span style="color: #EE784A;">'+ horario +'</span>' +
            '                            </div>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td align="center">' +
            '                            <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">' +
            '                                <tr>' +
            '                                    <td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td align="center">' +
            '                            <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">' +
            '                                <tr>' +
            '                                    <td align="center" style="color: #888888; font-size: 16px; font-family: "Work Sans", Calibri, sans-serif; line-height: 24px;">' +
            '                                        <div style="line-height: 24px">' +
            '                                            Te haz inscrito a esta clase y tu lugar se ha apartado, recuerda que tienes 12 horas antes de la clase si deseas cancelar' +
            '                                        </div>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '                    </tr>' +
            '                    <tr>' +
            '                        <td align="center">' +
            '                            <table border="0" align="center" width="160" cellpadding="0" cellspacing="0" bgcolor="EE784A" style="">' +
            '                                <tr>' +
            '                                    <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>' +
            '                                </tr>' +
            '                                <tr>' +
            '                                    <td align="center" style="color: #ffffff; font-size: 14px; font-family: "Work Sans", Calibri, sans-serif; line-height: 26px;">' +
            '                                        <div style="line-height: 26px;">' +
            '                                            <a href="https://qatro.fit/" style="color: #ffffff; text-decoration: none;">Ir al sitio web</a>' +
            '                                        </div>' +
            '                                    </td>' +
            '                                </tr>' +
            '                                <tr>' +
            '                                    <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '    </table>' +
            '    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">' +
            '        <tr class="hide">' +
            '            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td height="60" style="border-top: 1px solid #e0e0e0;font-size: 60px; line-height: 60px;">&nbsp;</td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td align="center">' +
            '                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">' +
            '                    <tr>' +
            '                        <td>' +
            '                            <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">' +
            '                                <tr>' +
            '                                    <td align="left">' +
            '                                        <a href="" style="display: block; border-style: none !important; border: 0 !important;"><img width="80" border="0" style="display: block; width: 80px;" src="https://qatro-server.herokuapp.com/assets/proyecto/logoqatro.png" alt="" /></a>' +
            '                                    </td>' +
            '                                </tr>' +
            '                                <tr>' +
            '                                    <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '                                </tr>' +
            '                                <tr>' +
            '                                    <td align="left" style="color: #888888; font-size: 14px; font-family: "Work Sans", Calibri, sans-serif; line-height: 23px;" class="text_color">' +
            '                                        <div style="color: #333333; font-size: 14px; font-family: "Work Sans", Calibri, sans-serif; font-weight: 600; mso-line-height-rule: exactly; line-height: 23px;">' +
            '                                            Email us: <br/> <a href="mailto:" style="color: #888888; font-size: 14px; font-family: "Hind Siliguri", Calibri, Sans-serif; font-weight: 400;">qatrofit@gmail.com</a>' +
            '                                        </div>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                            <table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">' +
            '                                <tr>' +
            '                                    <td width="2" height="10" style="font-size: 10px; line-height: 10px;"></td>' +
            '                                </tr>' +
            '                            </table>' +
            '                            <table border="0" width="200" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">' +
            '                                <tr>' +
            '                                    <td class="hide" height="45" style="font-size: 45px; line-height: 45px;">&nbsp;</td>' +
            '                                </tr>' +
            '                                <tr>' +
            '                                    <td height="15" style="font-size: 15px; line-height: 15px;">&nbsp;</td>' +
            '                                </tr>' +
            '                                <tr>' +
            '                                    <td>' +
            '                                        <table border="0" align="right" cellpadding="0" cellspacing="0">' +
            '                                            <tr>' +
            '                                                <td>' +
            '                                                    <a href="https://www.facebook.com/mdbootstrap" style="display: block; border-style: none !important; border: 0 !important;"><img width="24" border="0" style="display: block;" src="http://i.imgur.com/Qc3zTxn.png" alt=""></a>' +
            '                                                </td>' +
            '                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
            '                                                <td>' +
            '                                                    <a href="https://twitter.com/MDBootstrap" style="display: block; border-style: none !important; border: 0 !important;"><img width="24" border="0" style="display: block;" src="http://i.imgur.com/RBRORq1.png" alt=""></a>' +
            '                                                </td>' +
            '                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
            '                                                <td>' +
            '                                                    <a href="https://plus.google.com/u/0/b/107863090883699620484/107863090883699620484/posts" style="display: block; border-style: none !important; border: 0 !important;"><img width="24" border="0" style="display: block;" src="http://i.imgur.com/Wji3af6.png" alt=""></a>' +
            '                                                </td>' +
            '                                            </tr>' +
            '                                        </table>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>' +
            '        </tr>' +
            '    </table>' +
            '    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="f4f4f4">' +
            '        <tr>' +
            '            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td align="center">' +
            '                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">' +
            '                    <tr>' +
            '                        <td>' +
            '                            <table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">' +
            '                                <tr>' +
            '                                    <td align="left" style="color: #aaaaaa; font-size: 14px; font-family: "Work Sans", Calibri, sans-serif; line-height: 24px;">' +
            '                                        <div style="line-height: 24px;">' +
            '                                            <span style="color: #333333;">Qatro fit</span>' +
            '                                        </div>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                            <table border="0" align="left" width="5" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">' +
            '                                <tr>' +
            '                                    <td height="20" width="5" style="font-size: 20px; line-height: 20px;">&nbsp;</td>' +
            '                                </tr>' +
            '                            </table>' +
            '                            <table border="0" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">' +
            '                                <tr>' +
            '                                    <td align="center">' +
            '                                        <table align="center" border="0" cellpadding="0" cellspacing="0">' +
            '                                            <tr>' +
            '                                                <td align="center">' +
            '                                                    <a style="font-size: 14px; font-family: "Work Sans", Calibri, sans-serif; line-height: 24px;color: #5caad2; text-decoration: none;font-weight:bold;" href="{{UnsubscribeURL}}">'+ hoy +'</a>' +
            '                                                </td>' +
            '                                            </tr>' +
            '                                        </table>' +
            '                                    </td>' +
            '                                </tr>' +
            '                            </table>' +
            '                        </td>' +
            '                    </tr>' +
            '                </table>' +
            '            </td>' +
            '        </tr>' +
            '        <tr>' +
            '            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>' +
            '        </tr>' +
            '    </table>' +
            '</body>' +
            '</html>'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};