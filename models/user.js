const mongoose = require('mongoose'); //mongoose es un modulo para conectarse a una base de datos mongodb


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,'El nombre de usuario es obligatorio'],
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria'],
    },
    role:{
        type:String,
        required:[true,'El rol es obligatorio'],
    }

});

module.exports = mongoose.model('User',userSchema); //exportar el modelo de usuario 