// Require

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

//Iniciar variables

var app = express();



// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
//Importaciòn de rutas
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/usuario');
var LoginRoutes = require('./routes/login');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


// mongodb+srv://serteza:aleatorio2506@cluster0-vdo2o.mongodb.net/test?retryWrites=true&w=majority
// entorno local: mongodb://localhost:27017/backend
// mongodb + srv: //serteza:<password>@cluster0-vdo2o.mongodb.net/test?retryWrites=true&w=majority
// Conexion a la base de datos

const uri = "mongodb+srv://serteza:aleatorio2506@cluster0-vdo2o.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

// mongoose.connection.openUri('mongodb://localhost:27017/qatro-backend', (err, res) => {
//     if (err) throw err;
//     console.log('Base de datos:  \x1b[32m%s\x1b[0m', 'online');

// });

// Server index config
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'));
app.use('/uploads', serveIndex(__dirname + '/uploads'));




// Rutas
app.use('/usuario', userRoutes);
app.use('/login', LoginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);


app.use('/', appRoutes);

app.listen(app.get('port'), () => {
    console.log('Express server puerto 3000:  \x1b[32m%s\x1b[0m', 'online');
});