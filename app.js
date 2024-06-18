const express = require('express');  //express es un framwork de nodejs para hacer apis REST
const bodyParser = require('body-parser'); //body-parser es un middleware de express para parsear el cuerpo de las peticiones
const cors = require('cors');//cors es un middleware de express para permitir peticiones de otros dominios

const jwt = require('jsonwebtoken'); //jsonwebtoken es un modulo para crear y verificar tokens
const bcrypt = require('bcryptjs'); //bcryptjs es un modulo para encriptar contraseñas
const mongoose = require('mongoose'); //mongoose es un modulo para conectarse a una base de datos mongodb
const dotenv = require('dotenv'); //dotenv es un modulo para cargar variables de entorno desde un archivo .env

dotenv.config({path:'./config.env'}); //cargar variables de entorno desde un archivo .env

//aqui van mis rutas
const userRoutes = require('./routes/userRoutes');

const FraccRoutes = require('./routes/FraccionamientoRoutes');

const app = express(); //app es una instancia de express
app.use(cors()); //permitir peticiones de otros dominios

app.use(express.json({limit:'50mb'})); //parsear el cuerpo de las peticiones con formato json
app.use(express.static(`${__dirname}/public`));

app.set('jwtkey','sd#asdv0%'); //clave secreta para firmar los tokens

const port = 3001; //puerto en el que va a correr el servidor

app.use('/api/users',userRoutes);
app.use('/api/fracc',FraccRoutes);

//conectar a la base de datos
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    
}).then(con => {
    //console.log(con.connections);
    console.log("Db connection successfull!");
});

app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
})