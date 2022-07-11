const { Schema, model } = require('mongoose');
const Order = require("../models/order");

const TaskStationSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre required']
    },
    processt: {
        type:Schema.Types.ObjectId,
        ref:'Process',
        requiered:[true, 'Process required']
    },
    Task: [{
        type:Schema.Types.ObjectId,
        ref:'Task',
        requiered:[true, 'Task required']
    }],
    Station:[{
        type:Schema.Types.ObjectId,
        ref:'Station',
        requiered:[true, 'Station required'],
        default: []
    }],
    OrderProductions:{
        type:Schema.Types.ObjectId,
        ref:'Order',
        required:[true, 'Order required']
    }
});

TaskStationSchema.methods.toJSON = function() {
    const { __v, _id, ...taskstation } = this.toObject();
    taskstation.uid = _id;
    
    return taskstation;
}

module.exports = model( 'TaskStation', TaskStationSchema );