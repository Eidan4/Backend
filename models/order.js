const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
 
const connection = mongoose.createConnection(process.env.MONGODB_ATLAS);
autoIncrement.initialize(connection);


const OrderSchema = Schema({
    Nro_Orden: {
        type: Number,
        required: false,
        default: 0
    },
    cliente: {
        type: String,
        required: true
    },
    fechaDeEntrega: {
        type: Date,
        required: true
    },
    OF: {
        type: Number,
        required: true
    },
    NroPedido: {
        type: Number,
        required: false,
        default: 0
    },
    codigo: {
        type: String,
        required: true
    },
    prefijo: {
        type: String,
        required: true
    },
    referencia: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1
    },
    NF: {
        type: Number,
        required: true
    },
    paso: {
        type: String,
        required: true
    },
    anchoTubo: {
        type: String,
        required: true
    },
    cantidadTubo: {
        type: Number,
        required: true
    },
    longitudTubo: {
        type: String,
        required: true
    },
    anchoAleta: {
        type: String,
        required: true
    },
    cantidadAleta: {
        type: Number,
        required: true
    },
    longitudAleta: {
        type: String,
        required: true
    },
    PC: {
        type: Boolean,
        required: true
    },
    UES_Colectores: {
        type: String,
        required: true
    },
    observaciones: {
        type: String
    },
    prioridad: {
        type: Boolean
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'Nro_Orden',
    startAt: 0000,
    incrementBy: 1,
});

OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'NroPedido',
    startAt: 0000,
    incrementBy: 1,
})


OrderSchema.methods.toJSON = function() {
    const { __v, _id, ...order } = this.toObject();
    order.uid = _id;
    
    return order;
}

module.exports = model( 'Order', OrderSchema );