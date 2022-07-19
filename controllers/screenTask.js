const { response } = require("express");

const Screen = require("../models/ScreenTask");

const createScreen = async (req, res=response) => {

    try {
        const titulo = req.body.titulo;
        const {descripcion,screen,prioridad}= req.body;

        const screen1 = new Screen({titulo,screen,descripcion,prioridad});

        await screen1.save();

        const screens = await Screen.findById(screen1.id)
                                    .populate('titulo','titulo')
                                    .populate('descripcion','descripcion')
                                    .populate('screen','screen')
                                    .populate('prioridad','prioridad')

        res.json(screens);
    } catch (error) {
        res.json({
            message: error
        })
    }   
}

const getScreen = async (req, res = response)=> {
    try {
        const screen = await Screen.find();
        res.json(screen); 
    } catch (error) {
        res.json({
            message: error
        })
    }

    
}

const updateScreen = async (req, res = response)=>{
    const {id} = req.params;

    if(id){
        const ids = await Screen.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID Screen'
            });
        }
    }

    let titulo = req.body.titulo;
    let {descripcion,prioridad,screen} = req.body;

    const screenTask = await Screen.findByIdAndUpdate(id ,{titulo,descripcion,prioridad,screen},{new: true});

    res.json(screenTask);
}

const deleteScreen = async (req, res = response)=>{
    const {id} = req.params;
    
    if(id){
        const ids = await Screen.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID Screen'
            });
        }
    }

    const screen = await Screen.findByIdAndRemove(id);

    res.json(screen);
}

module.exports = {
    createScreen,
    getScreen,
    updateScreen,
    deleteScreen
}