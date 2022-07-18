const { response } = require("express");

const Task = require("../models/task");
const User = require('../models/user');
const Station = require('../models/station');
const Zone = require("../models/zone");

const createTask = async (req, res = response) => {

    const name = req.body.name;
    const { description, station, zone, operarios, estandarizacion } = req.body;

    for (var i = 0; i < operarios.length; i++) {

        const operario = await User.findById(operarios[i]);

        if (!operario) {
            return res.status(401).json({
                msg: `Operator with the id ---${operarios[i]}--- is not registered`
            });
        }
    }

    const task = new Task({ name, description, station, zone, operarios, estandarizacion });

    await task.save();

    const tasks = await Task.findById(task.id)
                            .populate('station', 'station')
                            .populate('zone', 'zone')
                            .populate('operarios', 'name')
                            .populate('estandarizacion','estandarizacion')

    res.json({
        tasks
    });
}

const getTasks = async (req, res = response) => {

    const { id } = req.params;

    if ( id ) {

        const query = { station: id };
        const [total, tasks] = await Promise.all([
            Task.count(query),
            Task.find(query)
                .populate('station', 'station')
                .populate('zone', 'zone')
        ]);

        return res.json({
            total,
            tasks
        });
    }

    const [total, tasks] = await Promise.all([
        Task.count(),
        Task.find()
            .populate('station', 'station')
            .populate('zone', 'zone')
    ]);

    res.json({
        total,
        tasks
    });
}

const updateTask = async(req, res = response) => {

    const { id } = req.params;

    const { name, description, station, zone, operarios, estandarizacion} = req.body;

    if ( station ) {
        const stations = await Station.findById(station);

        if ( !stations ) {
            return res.status(400).json({
                msg: 'Invalid station'
            });
        }
    }

    if ( zone ) {
        const zones = await Zone.findByIdAndUpdate(zone)

        if ( !zones ) {
            return res.status(400).json({
                msg: 'Invalid zone'
            });
        }
    }

    if ( operarios ) {
        for (var i = 0; i < operarios.length; i++) {

            const operario = await User.findById(operarios[i]);
    
            if (!operario) {
                return res.status(401).json({
                    msg: `Operator with the id ---${operarios[i]}--- is not registered`
                });
            }
        }
    }

    const task = await Task.findByIdAndUpdate(id, { name, description, station, zone, operarios, estandarizacion}, {new: true});

    res.json({
        task
    });
}

const deleteTask = async(req, res) => {

    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id)

    res.json({
        task
    });
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}