const { response } = require("express");

// const Station = require('../models/station');

const getStations = async(req, res = response) => {

    const station = await Station.find();

    const total = await Station.countDocuments();

    res.json({
        total,
        station
    });
}

const createStation = async(req, res = response) => {

    const station = req.body.station.toLowerCase();

    const stations = new Station({station});

    await stations.save();

    res.json({
        stations
    });
}

const updateStation = async(req, res = response) => {

    const { id } = req.params;

    let { station } = req.body;

    if (station) {
        station = req.body.station.toLowerCase();

        const stations = await Station.findOne({station});

        if (stations) {
            return res.status(400).json({
                msg: 'The station is already registered'
            });
        }
    }

    const stations = await Station.findByIdAndUpdate(id, {station}, {new: true});

    res.json({
        stations
    });
}

const deleteStation = async(req, res = response) => {

    const { id } = req.params;

    const station = await Station.findByIdAndDelete(id);

    res.json({
        station
    });
}

module.exports = {
    getStations,
    createStation,
    updateStation,
    deleteStation
}