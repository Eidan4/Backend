const { Schema, model } = require('mongoose');

const  InventorySchema = Schema({
    //Nombre de la materia prima
    name_primary:{
        type: String,
        requiere: [true,'Name_primary is required']
    },
    //cantidad que hay en el inventario
    amount_stored:{
        type: Number,
        require:[true,'Amount is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    //catidad que se consume
    amount_consumption:{
        type: Number,
        require:[true,'Amount is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    //precio unitario
    unit_price:{
        type: Number,
        require:[true,'Unit_price is required'],
        min:[0,'There can be no negative numbers'],
        default:0
    },
    //precio total del inventario
    inventory_price:{
        type:Number,
        require:false,
        default:0,
    },
    //estacion donde se utiliza la materia prima
    station:{
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: [true, 'Station is required']
    },
    //producto que se utiliza
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

InventorySchema.methods.toJSON=function() {
    const {__v, _id,...inventory} = this.toObject();
    inventory.uid=_id;

    return inventory;
}


module.exports = model( 'Inventory', InventorySchema);