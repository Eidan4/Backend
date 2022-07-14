const ProccessIntance = require('../models/processInstance');


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
    const processintance = await ProccessIntance.find(
        {"process.tasks._id": id }, {"process.tasks.$": true} 
        )

    res.json({
        processintance
    });
}

// Actualizacion de Status_product
const updatedIntanceDad = async (req, res = response) => {
   
    const {id}= req.params;
    let {status_product}= req.body; 
    const processintancedad = await ProccessIntance.update(id,{status_product},{new:true})
        .populate('status_product', 'name');
    res.json(processintancedad); 
}
//Revisar


//Ver como hacer la actualizacion de la start_finish

const updatedIntanceHjo = async (req, res = response) => {
    const {id}=req.params;    
    const {idhijo} = req.params;
    const {process} = req.body;
    ProccessIntance.update({'process.tasks._id':idhijo},{'$set':{
        'process.tasks.start_finish':'update'
    }})
    
}

//No actualiza pero agrega el body y borra el resto (Puede servir en cualquier en una ocasion)
// const respuesta = await ProccessIntance.find({"process.tasks._id":idhijo},{"process.tasks.start_finish.$": true}).exec((error,product)=>{
    //     console.log(product);
    //     ProccessIntance.findOneAndUpdate(product,update,{new:true}).exec((error,inventario)=>{
    //         res.json(inventario); 
    //     })
    // })


// ProccessIntance.findById(id).exec((error,inventario)=>{
    //     let lista2 = inventario.process.tasks;
    //     for(let i= 0; i < lista2.length; i++){
    //         let lista = [];
    //         let respuesta = lista2[i]._id;
    //         let contenido = lista2[i]
    //         if(respuesta == idhijo){
    //             lista.push(contenido);
    //             modificar={start_finish:(lista.start_finish="cambiar")}
    //             ProccessIntance.findByIdAndUpdate({"process.tasks._id": id },modificar).exec((error,inventario)=>{
    //                 res.json(inventario);
    //             })
    //         }
    //     }
    // // })
    // ProccessIntance.find({"process.tasks._id":idhijo},{"process.tasks.start_finish.$": true}).exec((error,inventario)=>{
    //     res.json(inventario);
    // })

module.exports ={
    updatedIntanceHjo,
    getProcessesIntance,
    updatedIntanceDad,
    getIntanceTask
}