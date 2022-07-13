const { response } = require("express");

const Screen = require("../models/screenTask");

const createScreen = async (req, res=response) => {
    const titulo = req.body.titulo;
    const {descripcion,campo,prioridad}= req.body;

    const screen = new Screen({titulo,descripcion,campo,prioridad});

    await screen.save();

    const screens = await Screen.findById(screen.id)
                                .populate('titulo','titulo')
                                .populate('descripcion','descripcion')
                                .populate('campo','campo')
                                .populate('prioridad','prioridad')

    res.json(screens);
}

const getScreen = async (req, res = response)=> {
    const screen = await Screen.find();
    res.json(screen);
}

const updateScreen = async (req, res = response)=>{
    const {id} = req.params;

    let titulo = req.body.titulo;
    let {descripcion,campo,prioridad} = req.body;

    const screen = await Screen.findByIdAndUpdate(id ,{titulo,descripcion,campo,prioridad},{new: true});

    res.json(screen);
}

const deleteScreen = async (req, res = response)=>{
    const {id} = req.params;
    const screen = await Screen.findByIdAndRemove(id);

    res.json(screen);
}

module.exports = {
    createScreen,
    getScreen,
    updateScreen,
    deleteScreen
}