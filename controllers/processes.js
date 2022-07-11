const { response } = require("express");

const Process = require("../models/process");
const Task = require('../models/task');
const Product = require('../models/product');

const createProcess = async (req, res = response) => {

    const { product, tasks } = req.body;

    for (var i = 0; i < tasks.length; i++) {

        const { task, dependent } = tasks[i];

        const validExistTask = await Task.findById(task);

        if (!validExistTask) {
            return res.status(401).json({
                msg: `Taks with the id ---${task}--- does not exist`
            });
        }

        if (dependent) {

            for (var j = 0; j < dependent.length; j++) {

                const validExistTask = await Task.findById(dependent[j]);

                if (!validExistTask) {
                    return res.status(401).json({
                        msg: `Taks with the id ---${dependent[j]}--- does not exist`
                    });
                }
            }
        }
    }

    const process = new Process({ product, tasks });

    await process.save();

    const processes = await Process.findById(process.id)
        .populate('product', 'name')
        .populate('tasks.dependent tasks.task', 'name');

    res.json(processes);
}

const getProcesses = async(req, res = response) => {

    const process = await Process.find();

    res.json({
        process
    });
}

const getProcessByPrefijo = async (req, res = response) => {

    const { prefijo } = req.params;

    const prefijoUpperCase = prefijo.toUpperCase();

    const product = await Product.findOne({ prefijo: prefijoUpperCase });

    const process = await Process.findOne({ product: product.id });

    res.json(process);
}

const updateProcess = async (req, res = response) => {

    const { id } = req.params;

    const { tasks } = req.body;

    if (tasks) {

        for (var i = 0; i < tasks.length; i++) {

            const { task, dependent } = tasks[i];

            const validExistTask = await Task.findById(task);

            if (!validExistTask) {
                return res.status(401).json({
                    msg: `Taks with the id ---${task}--- does not exist`
                });
            }

            if (dependent) {

                for (var j = 0; j < dependent.length; j++) {

                    const validExistTask = await Task.findById(dependent[j]);

                    if (!validExistTask) {
                        return res.status(401).json({
                            msg: `Taks with the id ---${dependent[j]}--- does not exist`
                        });
                    }
                }
            }
        }

    }

    const process = await Process.findByIdAndUpdate(id, { tasks }, { new: true })
        .populate('product', 'name')
        .populate('tasks.dependent', 'name')
        .populate('tasks.task', 'name');

    res.json(process);
}

const deleteProcess = async(req, res = response) => {

    const { id } = req.params;

    const process = await Process.findByIdAndRemove(id);

    res.json(process);
}

module.exports = {
    createProcess,
    getProcessByPrefijo,
    getProcesses,
    updateProcess,
    deleteProcess
}