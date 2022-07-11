const { Schema, model } = require('mongoose');

const ZoneSchema = Schema({
    zone: {
        type: String,
        required: [true, 'Zone is required']
    }
});

ZoneSchema.methods.toJSON = function() {
    const { __v, _id, ...zone } = this.toObject();
    zone.uid = _id;
    
    return zone;
}

module.exports = model( 'Zone', ZoneSchema );