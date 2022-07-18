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
     if(!processintance){
        res.json("No se encontro ningun proceso con esa Tarea")
     }
    res.json({
        processintance
    });
}

// Actualizacion de Status_product
const updatedIntanceDad = async (req, res = response) => {
   
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
    const processintancedad = await ProccessIntance.update(id,{status_product},{new:true})
        .populate('status_product', 'name');
    res.json(processintancedad); 
}

//Ver como hacer la actualizacion de la start_finish

const updatedIntanceHjo = async (req, res = response) => {
    const {id}=req.params;    

    const processintance = await ProccessIntance.find(
        {"process.tasks._id": id }, {"process.tasks.$": true} 
    )

    res.json(processintance)
}

module.exports ={
    updatedIntanceHjo,
    getProcessesIntance,
    updatedIntanceDad,
    getIntanceTask
}