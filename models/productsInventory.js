const { Schema, model } = require('mongoose');

const ProductsInventorySchema = Schema({
    name_product:{
        type: String,
        required: [true, 'Name_product is required']
    },
    amount_stored:{
        type: Number,
        required: [true, 'Amount_stored is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    amount_consumption:{
        type: Number,
        required: [true, 'Amount_consumption is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    unit_price:{
        type: Number,
        required: [true, 'Unit_price is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    inventory_price:{
        type: Number,
        required: [true, 'Inventory_price is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    inventory_primary:[
        {
            type:Schema.Types.ObjectId,
            ref:'Inventory',
            required: [true, 'Inventory_primary is required']
        }
    ],
    inventory_sub_product:[
        {
            type:Schema.Types.ObjectId,
            ref:'InventorySubProduct',
            required: [true, 'Inventory_sub_product is required']
        }
    ]

})

ProductsInventorySchema.methods.toJSON = function(){
    const { __v, _id, ...productsinventory } = this.toObject();
    productsinventory.uid= _id;
    return productsinventory;
}

module.exports = model( 'ProductsInventory',ProductsInventorySchema);