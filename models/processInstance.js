const { Schema, model } = require('mongoose');

const processInstanceSchema = new Schema({
    status_product: {
        type: String,
        required: [true, 'Status_product is required'],
        default: 'No se ha iniciado el proceso del producto'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    process: {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, 'Product is required']
        },
        tasks: [
            {
                task: {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                    required: [true, 'Task is required']
                },
                start_finish: {
                    type: String,
                    default: 'No se ha iniciado la tarea'
                },
                start_date: Date,
                finish_date: Date,
                operator: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ],
    }
});

processInstanceSchema.methods.toJSON = function() {
    const { __v, _id, ...processInstance } = this.toObject();
    processInstance.uid = _id;
    
    return processInstance;
}

module.exports = model( 'ProcessInstance', processInstanceSchema );