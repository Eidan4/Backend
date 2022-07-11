const { Schema, model } = require('mongoose');

const StationSchema = Schema({
    station: {
        type: String,
        required: [true, 'Station is required']
    }
});

StationSchema.methods.toJSON = function() {
    const { __v, _id, ...station } = this.toObject();
    station.uid = _id;
    
    return station;
}

module.exports = model( 'Station', StationSchema );