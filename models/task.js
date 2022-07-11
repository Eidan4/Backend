const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    name: {
        type: String,
        required: [true, 'Task is required']
    },
    description: {
        type: String,
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: [true, 'Station is required']
    },
    zone: {
        type: Schema.Types.ObjectId,
        ref: 'Zone',
        required: [true, 'Zone is required']
    },
    operarios: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Operarios is required']
        }
    ],
    estandarizacion:{
        type: Number,
        required: [true, 'Estanderizacion is required']
    }
});

TaskSchema.methods.toJSON = function() {
    const { __v, _id, ...task } = this.toObject();
    task.uid = _id;
    
    return task;
}

module.exports = model( 'Task', TaskSchema );