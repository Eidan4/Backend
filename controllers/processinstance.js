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

//Traer la tarea de un ProcessIntance por el Id de la tarea
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

//Ver solo un processIntance por el ID
const getProcessesIntanceId = async (req, res = response) => {
    const {id} = req.params;
    const processintance = await ProccessIntance.findById(id);
    res.json(processintance);
}

//Listo (Se necesita id del ProcessIntance y idhijo es id de la tarea que quiere actualizar) solo lo pone en Proceso
const updatedIntanceHjoProceso = async (req, res = response) => {
    const {id}=req.params;    
    const {idhijo} = req.params;
    if(id){
        const ids = ProccessIntance.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'No se encuentra el ProcessInstance'
            })
        }
    }

    if(idhijo){
        const idhijos = ProccessIntance.find({"process.tasks._id": id }, {"process.tasks.$": true});
        if(!idhijos){
            return res.status(404).json({
                msg: "No se encontro esa tarea en ningun ProcessIntance"
            })
        }
    }

    const processintance1 = await ProccessIntance.findOneAndUpdate({"_id":id},{$set:{"process.tasks.$[task].start_finish":"En Proceso"}},{arrayFilters:[{"task._id":{$eq:idhijo}}]}).exec((error,inventario)=>{
        if(error){
            res.json({msg: error})
        }
        ProccessIntance.findOneAndUpdate({"_id":id},{$set:{"process.tasks.$[task].start_date":new Date()}},{arrayFilters:[{"task._id":{$eq:idhijo}}]}).exec((error,inventario)=>{
            res.json(inventario)
        })
    })
}

//Listo (Se necesita id del ProcessIntance y idhijo es id de la tarea que quiere actualizar) solo lo pone en Finalizar
const updatedIntanceHjoFinalizo = async (req, res = response) => {
    const {id}=req.params;    
    const {idhijo} = req.params;
    if(id){
        const ids = ProccessIntance.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'No se encuentra el ProcessInstance'
            })
        }
    }

    if(idhijo){
        const idhijos = ProccessIntance.find({"process.tasks._id": id }, {"process.tasks.$": true});
        if(!idhijos){
            return res.status(404).json({
                msg: "No se encontro esa tarea en ningun ProcessIntance"
            })
        }
    }

    const processintance1 = await ProccessIntance.findOneAndUpdate({"_id":id},{$set:{"process.tasks.$[task].start_finish":"Finalizado"}},{arrayFilters:[{"task._id":{$eq:idhijo}}]}).exec((error,inventario)=>{
        if(error){
            res.json({msg: error})
        }
        ProccessIntance.findOneAndUpdate({"_id":id},{$set:{"process.tasks.$[task].finish_date":new Date()}},{arrayFilters:[{"task._id":{$eq:idhijo}}]}).exec((error,inventario)=>{
            res.json(inventario);
        })
        
    })
}

//Resta las fechas
const restaFecha = async (req, res = response) => {
    const {id}=req.params;    
    const {idhijo} = req.params;
    let lista1 = [];
    const processintance = await ProccessIntance.find(
        {"process.tasks._id": idhijo }, {"process.tasks.$": true} 
    ).exec((error,lista)=>{
        for(let i=0; i<lista.length; i++){
            let status = lista[i].process.tasks;
            for(let j=0; j<status.length; j++) {
                let start = status[j].start_date;
                let start_ =start.getTime();
                let end = status[j].finish_date;
                let result = new Date(end.getTime()-start.getTime());
                ProccessIntance.findOneAndUpdate({"_id":id},{$set:{"process.tasks.$[task].result_date":result}},{arrayFilters:[{"task._id":{$eq:idhijo}}]}).exec((error,inventario)=>{
                    res.json(inventario);
                })
            }
        }
    }) 
}

//ID de la tarea (Se necesita id del ProcessIntance y idhijo es id de la tarea que quiere actualizar)
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
    updatedIntanceHjoProceso,
    updatedIntanceHjoFinalizo,
    getProcessesIntance,
    updatedIntanceDad,
    getIntanceTask,
    validateOperario,
    restaFecha,
    getProcessesIntanceId
}