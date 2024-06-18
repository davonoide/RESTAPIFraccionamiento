const mongoose = require('mongoose');

const FraccionamientoSchema = new mongoose.Schema({

    nombreFracc:{
        type:String,
        required:[true,'Nombre de fraccionamiento es obligatorio'],
    },

    direccion:{
        type:String,
        required:[true,'Direccion es obligatorio'],
    },
    NumeroCasas:{
        type:Number,
        required:[true,'Numero de casas es obligatoria'],
    },
    tipoFraccionamiento:{
        type:String,
        required:[true,'El tipo de fraccionamiento es obligatorio, (sustentable/tradicional)'],
    },

    zonasInteres:{
        type:String,
        required:[true,'las zonas de interes son obligatorias'],
    },

    casasHabitadas:{
        type:Number, 
        required:[true, 'casas habitadas es un campo obligatorio']
    }

});

module.exports = mongoose.model('Fraccionamiento',FraccionamientoSchema); //exportar el modelo de fracc