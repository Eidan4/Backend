const { Schema, model } = require('mongoose');

const ProcessSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
        unique: true
    },
    tasks: [
        {
            task: {
                type: Schema.Types.ObjectId,
                ref: 'Task',
                required: [true, 'Task is required']
            },
            dependent: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task'
                }
            ]
        }
    ]
});

ProcessSchema.methods.toJSON = function() {
    const { __v, _id, ...process } = this.toObject();
    process.uid = _id;
    
    return process;
}

module.exports = model( 'Process', ProcessSchema );