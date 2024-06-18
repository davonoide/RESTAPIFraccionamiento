const express = require('express');
const Fracc =  require('../models/Fraccionamiento');

const {default:mongoose} = require('mongoose');
const Fraccionamiento = require('../models/Fraccionamiento');


const createFracc = async (req,res)=>{

    let cuerpoRequest = req.body;
    const _fracc = await Fracc.exists({nombreFracc:cuerpoRequest.nombreFracc});
    if(_fracc){
        return res.status(400).json({
            ok:false,
            message:'El ya existe'
        });
    }else{
        
            const Fracc_new = new Fracc({
                nombreFracc:cuerpoRequest.nombreFracc,
                direccion: cuerpoRequest.direccion,
                NumeroCasas: cuerpoRequest.NumeroCasas,
                tipoFraccionamiento: cuerpoRequest.tipoFraccionamiento,
                zonasInteres: cuerpoRequest.zonasInteres,
                casasHabitadas: cuerpoRequest.casasHabitadas
                
            });

            Fracc_new.save().then(createdFracc=>{
                console.log(createdFracc._id);
                if(createdFracc){
                    res.status(201).json({
                        msg:"Usuario creado",
                        FraccID:createdFracc._id
                    });
                }else{
                    res.status(500).json({
                        msg:"Error al crear usuario"
                    });
                }
            })
        
    }

};

const getAll = async (req,res)=>{
    const fraccs = await Fracc.find({}); //esto me trae todos los fracc
    res.status(200).json({
        fraccionamientos:fraccs
    });
};

const getFracc = async (req,res)=>{
    console.log(req.params);
    const id = req.params.id;

    const fraccEncontrado = await Fracc.find({_id:id},{Fraccname:1, direccion:1, NumeroCasas:1, tipoFraccionamiento:1, zonasInteres:1, casasHabitadas:1});
    if(fraccEncontrado){
        res.status(200).json({
            fraccionamiento:fraccEncontrado
        });
    }
};

const updateFracc = async (req,res)=>{
    let cuerpoRequest = req.body;

    return Fracc.updateOne(
        {_id:req.params.id},
        {
            $set:{
                nombreFracc:cuerpoRequest.nombreFracc,
                direccion: cuerpoRequest.direccion,
                NumeroCasas: cuerpoRequest.NumeroCasas,
                tipoFraccionamiento: cuerpoRequest.tipoFraccionamiento,
                zonasInteres: cuerpoRequest.zonasInteres,
                casasHabitadas: cuerpoRequest.casasHabitadas
            }
        }
    ).then(result=>{
        res.status(200).json({
            msg:"Fraccionamiento actualizado"
        });
    })
};

const delFracc = async (req,res)=>{
    console.log(req.params);
    const id = req.params.id;

    const fraccEliminado = await Fracc.deleteOne({_id:id},{Fraccname:1, direccion:1, NumeroCasas:1, tipoFraccionamiento:1, zonasInteres:1, casasHabitadas:1});
    if(fraccEliminado){
        res.status(200).json({
            fraccionamiento:fraccEliminado
        });
    }
};

const router = express.Router();
//endpoints
router.route('/')
                .post(createFracc)
                .get(getAll);

router.route('/:id')
                .patch(updateFracc)
                .delete(delFracc)
                .get(getFracc);
                


                
                


module.exports = router;