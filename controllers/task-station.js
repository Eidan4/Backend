const Task1 = require("../models/task");
const User = require('../models/user');
const Zone = require("../models/zone");
const Pro= require("../models/process");
const TaskStation = require("../models/task-station");
const Order= require("../models/order");
const Product = require('../models/product');
const ProccessIntance = require('../models/processInstance');
const { response } = require("express");
const taskStation = require("../models/task-station");

//Sin uso
const createTaskStation = async (req, res = response)=>{
    //Order ID
    const {id} = req.params;

    if(id){
        const ids = await Order.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID Order'
            });
        }
    }

    const order = await Order.findById(id);
    const prefijo = order.prefijo;
    const prefijoUpperCase = prefijo.toUpperCase();
    const product = await Product.findOne({ prefijo: prefijoUpperCase });
    const process = await Pro.findOne({ product: product.id });
    const busqueda = process.tasks;
    let mapeo = busqueda.map(function(obj){
        let rObj = {};
        rObj[obj.task]=true;
        return obj.task;
    })
    // console.log(mapeo);
    lista = [];

    const nombre = req.body.nombre;
    const OrderProductions = id;
    const processt = product.id;
    const Task = mapeo;

    const taskstation = new TaskStation({nombre:nombre,OrderProductions:OrderProductions,processt:processt,Task:Task,Station:Station});
    await taskstation.save();
    const taskstations = await TaskStation.findById(taskstation.id)
                                          .populate('nombre','nombre')
                                          .populate('OrderProductions','OrderProductions')
                                          .populate('Task','Task')
                                          .populate('Station','Station')

    // res.json(taskstations);

    getStations(mapeo,taskstation.id);
}
//Importante
const getTaskStation =async(req, res = response) => {

    const {id} = req.params; 
   
    //verificacion
    if(id){
        const ids = await Task1.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID Task'
            });
        }
    }
    

    let lista = [];
    let lista2 = [];

            ProccessIntance.find({"process.tasks.task": id }).exec((error,inventario)=>{
                if(inventario.length == 0){
                    return res.status(404).json("No se encontro ninguna proceso intance con esta tarea")
                }
                for(let i=0; i<inventario.length; i++) {
                    lista2.push(inventario[i].order);
                    if(inventario.length === lista2.length){
                        for(let j=0; j<lista2.length; j++) {
                            buscar = lista2[j];
                            Order.findOne(buscar).exec((error,inventario)=>{
                                    if(error) {
                                        res.json("No se encontro ninguna Orden con esa Tarea") 
                                    }
                                        lista.push(inventario);
                                    if(lista2.length === lista.length){
                                        res.json(lista);  
                                    }
                                })
                            }
                        }  
                }
            });
    }

const getTaskTodos = async (req, res= response) => {

    try {
        const lista = await Task1.find({},{"name":1,"station":1,"zone":1,"operarios":1})
        .populate('station', 'station')
        .populate('zone', 'zone')
        .populate('operarios', 'name')
        .populate('estandarizacion','estandarizacion')
    res.json(lista)
    } catch (error) {
        res.json("Ocurrio un error con las tareas");
    }
    
    
}

const updateTaskStation = async(req, res=response) => {
    const {id} = req.params;
    if(id){
        const ids = await TaskStation.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID TaskStation'
            });
        }
    }
    let lista = [];
    TaskStation.findById(id).exec((error,inventario)=>{
        const  estaciones = inventario.Task;
        res.json(estaciones);
        for (let i = 0; i < estaciones.length; i++){
            Task1.findById(estaciones[i]).exec((error,inventario)=>{
                let total = inventario;
                lista.push(total);
                if(estaciones.length === lista.length){
                    TaskStation.findById(id).exec((error,inventario)=>{
                        listaStation = inventario.Station;
                        StationUpdate = lista.map((item)=>{
                            listaStation.push(item);
                            return item;
                        });
                        function agregar(listaStation){
                            rellenar = inventario.Station;
                            for (numeros of listaStation){
                                rellenar.push(numeros)
                            }
                        }
                        inventarioUpdate = {Station : (agregar(listaStation))};
                        TaskStation.findByIdAndUpdate(id,inventarioUpdate)
                        res.json(inventario);
                    })
                }
            })
        }
    })
}


const log = async (req, res=response) => {
    const {id} = req.params;
    const {numerodeidentidad} = req.body;
    try{
        const station = await findById(id).exec((error,inventario)=>{

        })
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Contact administrator'
        });
    }
}

module.exports = {createTaskStation,getTaskStation,updateTaskStation,getTaskTodos};