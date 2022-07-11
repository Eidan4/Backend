const { Schema, model } = require('mongoose');

const  InventorySubProductSchema = Schema({
    name_sub:{
        type:String,
        required:[true, 'NameSub is required']
    },
    amount_stored:{
        type:Number,
        required:[true, 'AmountStored is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    unit_price:{
        type:Number,
        required:[true, 'UnitPrice is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    inventory_price:{
        type:Number,
        required:false,
        default:0
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        requiered:[true,'Product is required']
    },
    materia_prima:[
        {
            type:Schema.Types.ObjectId,
            ref:'Inventory',
            requiered:[true, 'materia_prima required']
        }
    ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

InventorySubProductSchema.methods.toJSON = function() {
    const {__v,_id,...inventorysubproduct} = this.toObject();
    inventorysubproduct.uid = _id;
    return inventorysubproduct;
}

module.exports = model('InventorySubProduct',InventorySubProductSchema);