const ProccessIntance = require('../models/processInstance');
const Task = require('../models/task');
const User = require("../models/user");

//Traer todo los processIntance
const getProcessesIntance = async(req, res = response) => {

    const processintance = await ProccessIntance.find();

    res.json({
        processintance 
    });
}


//Traer el processIntance por el id
const getIntanceTask = async (req, res=response) => {
     const {id}=req.params;

    try {
        const processintance = await ProccessIntance.find(
            {"process.tasks._id": id }, {"process.tasks.$": true} 
        )

        if(processintance.length == 0){
            return res.json("No se encontro ningun proceso con ese ID");
        } 

        res.json(
            processintance
        );  
        
    } catch (error) {
        res.json("Hubo un error")
    }
    
    
}

// Actualizacion de Status_product
const updatedIntanceDad = async (req, res = response) => {
   
    try {
        const {id}= req.params;

        if(id){
            const ids = await ProccessIntance.findById(id);
            if(!ids){
                return res.status(404).json({
                    msg: 'Invalid ID ProductsInventory'
                });
            }
        }

        let {status_product}= req.body; 
        const processintancedad = await ProccessIntance.findByIdAndUpdate(id,{status_product},{new:true})
            .populate('status_product', 'name');
        res.json(processintancedad); 
    } catch (error) {
        res.json("Hubo Un Error")
    }
}

//Ver como hacer la actualizacion de la start_finish ---> Todavia no esta hecho

const updatedIntanceHjo = async (req, res = response) => {
    const {id}=req.params;    
    const {process} = req.body;
    const processintance = await ProccessIntance.findOneAndUpdate(
        {"process.tasks._id": id },process,{new:true}
    )

    res.json(processintance)
}

//ID de la tarea
const validateOperario = async (req, res = response) => {
    const {id} = req.params;
    const documents = req.body.documents;
    let lista = [];
    let lista2 = [];

    if(id){
        const ids = await Task.findById(id);
        if(!ids){
            return res.status(400).json({
                msg: 'Invalid Task'
            });
        }
    }
    try{
        const user = await Task.findById(id).exec((error,validate)=>{
            const search = validate.operarios;
            // res.json(search);
            for(let i = 0; i < search.length;i++){
               User.findById(search[i]).exec((error,validate)=>{
                    lista.push(validate);
                    if(lista.length == search.length){
                        function resultado(lista){
                            return lista.document === documents 
                        } 
                        res.json(lista.find(resultado)); 
                    }
               })
            }
        })
    }catch(error){
        res.json("No se puedo registrar")
    }
}

    

module.exports = {
    updatedIntanceHjo,
    getProcessesIntance,
    updatedIntanceDad,
    getIntanceTask,
    validateOperario
}