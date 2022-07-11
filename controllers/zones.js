const { response } = require("express");
const zone = require("../models/zone");

const Zone = require("../models/zone");

const createZone = async(req, res = response) => {

    const zone = req.body.zone.toLowerCase();

    const zones = new Zone({zone});

    await zones.save();

    res.json({
        zones
    });
    
}

const getZone = async(req, res = response) => {

    const zone = await Zone.find();

    const total = await Zone.countDocuments();

    res.json({
        total,
        zone
    });
}

const updateZone = async(req, res = response) => {

    const { id } = req.params;

    let { zone } = req.body;

    if (zone) {
        zone = req.body.zone.toLowerCase();

        const zones = await Zone.findOne({zone});

        if (zones) {
            return res.status(400).json({
                msg: `The zone: ${zone} is already registered`
            });
        }
    }

    const zones = await Zone.findByIdAndUpdate(id, {zone}, {new: true});

    res.json({
        zones
    })
}

const deleteZone = async(req, res = response) => {

    const { id } = req.params;

    const zone = await Zone.findByIdAndDelete(id);
    
    res.json({
        zone
    });
}

module.exports = {
    createZone,
    getZone,
    updateZone,
    deleteZone
}