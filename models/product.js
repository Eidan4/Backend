const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    prefijo: {
        type: String,
        required: [true, 'Prefijo is required'],
        unique: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    
    return product;
}

module.exports = model( 'Product', ProductSchema );