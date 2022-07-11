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
    const processintancedad = await ProccessIntance.findByIdAndUpdate(id,{status_product},{new:true})
        .populate('status_product', 'name');
    res.json(processintancedad);
}

//Revisar


//Ver como hacer la actualizacion de la start_finish

const updatedIntance = async (req, res = response) => {
    const { id }= req.params;
    const {process} = req.body;
    res.json(process.tasks); 
    const processintance = await ProccessIntance.find(
        {"process.tasks._id": id }, {"process.tasks.start_finish.$": true} 
    ).exec((err, processi) => {        
        ProccessIntance.findByIdAndUpdate(processi,start_finish).exec((err, process)=>{
            if(err) throw err; 
        })
    })
}

//     //Por revisar  actualizacion estado tarea
//     // const {id}= req.params;
//     // var query = {"process.tasks._id": id };
//     // var newvalue = { set: {"process.tasks.start_finish":"Cambio"}};
//     // const processintancedad = await ProccessIntance.update(
//     //     {"process.tasks._id":id},{"process.tasks.start_finish.$": "Cambio"})
//     //     // query,newvalue,function(err,res){
//     //     //     if(err) throw err;
//     //     //     console.log(res);
//     //     // }
//     // // ).clone().catch(function(err){ console.log(err)})
//     //     // .populate('start_finish', 'name');
//     // res.json({processintancedad})

//     const {id}= req.params;
//     const idtasks = req.body.process.tasks.find(itemInArray => itemInArray.id === id)
//     console.log(idtasks);

//     // const myArray = [{id: 1, name:'pipi'}, {id: 2, name:'popo'}];
//     // const id = 2;

//     // const variableOne = myArray.filter(itemInArray => itemInArray.id === id);
//     // console.log(variableOne);
    
// };

module.exports ={
    updatedIntance,
    getProcessesIntance,
    updatedIntanceDad,
    getIntanceTask
}