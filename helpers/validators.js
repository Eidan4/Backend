const Process = require('../models/process');
const Product = require('../models/product');
const Role = require('../models/role');
const Station = require('../models/station');
const Task = require('../models/task');
const User = require('../models/user');
const Zone = require('../models/zone');

const validExistUserByEmail = async(email = '') => {

    const user = await User.findOne({email});

    if (user) {
        throw new Error('The email is already registered');
    }
}

const validExistUserByDocument = async(document) => {

    const user = await User.findOne({document});

    if (user) {
        throw new Error('Document is already registered');
    }
}

const validExistRole = async(role = '') => {

    const rol = await Role.findOne({role});

    if ( !rol ) {
        throw new Error('Invalid Role');
    }
}

const validExistUserByID = async(id = '') => {

    const user = await User.findById(id);

    if ( !user ) {
        throw new Error('Invalid ID');
    }
}

const validExistEmailByLogin = async(email = '') => {

    const user = await User.findOne({email});

    if ( !user ) {
        throw new Error('Invalid email/password');
    }
}

const validExistStationByID = async(station = '') => {

    const stations = await Station.findById(station);

    if ( !stations ) {
        throw new Error('Invalid station ID');
    }
}

const validExistZoneByID = async(zone = '') => {

    const zones = await Zone.findById(zone);

    if ( !zones ) {
        throw new Error('Invalid zone');
    }
}

const validExisTaskByID = async(id = '') => {

    const task = await Task.findById(id);

    if ( !task ) {
        throw new Error('Invalid task ID');
    }
}

const validExistProductByPrefijo = async(prefijo = '') => {

    const prefijoUpperCase = prefijo.toUpperCase();

    const product = await Product.findOne({prefijo: prefijoUpperCase});

    if (product) {
        throw new Error(`El prefijo: ${prefijo} ya pertenece a un producto`);
    }
}

const validExistProductByID = async(id = '') => {

    const product = await Product.findById(id);

    if ( !product ) {
        throw new Error('Invalid product ID');
    }
}

const validExistProcessByProduct = async(id = '') => {

    const process = await Process.findOne({product: id});

    if ( process ) {
        throw new Error(`The product with ID: ---${id}--- already has a registered process`);
    }
}

const validExistProcessByPrefijo = async(prefijo = '') => {

    const prefijoUpperCase = prefijo.toUpperCase();

    const product = await Product.findOne({prefijo: prefijoUpperCase});

    if ( !product ) {
        throw new Error(`The prefijo: ${prefijo} does not exist`);
    }

    const process = await Process.findOne({product: product.id});

    if ( !process ) {
        throw new Error(`There is no Process Template with that prefijo ---${prefijoUpperCase}---`);
    }
}

const validExistProcessByID = async(id = '') => {

    const process =  await Process.findById(id);

    if ( !process ) {
        throw new Error('Invalid process ID');
    }
}

const validExistStation = async(station = '') => {

    const stationLowerCase = station.toLowerCase();

    const stations = await Station.findOne({station: stationLowerCase});

    if (stations) {
        throw new Error('The station is already registered');
    }
}

const validExistStationById = async(id = '') => {

    const station = await Station.findById(id);

    if ( !station ) {
        throw new Error('Invalid station ID');
    }
}

const validExistZone = async(zone = '') => {

    const zoneLowerCase = zone.toLowerCase();

    const zones = await Zone.findOne({zone: zoneLowerCase});

    if (zones) {
        throw new Error(`The zone: ${zone} is already registered`);
    }
}

const validFecha = async(fechaDeEntrega = '') => {

    const dateToday = new Date();

    if (Date.parse(fechaDeEntrega) < Date.parse(dateToday)) {
        throw new Error('Fecha inválida');
    }
}

const validExistPrefijo = async(prefijo = '') => {

    const prefijoUpperCase = prefijo.toUpperCase();

    const product = await Product.findOne({prefijo: prefijoUpperCase});

    if ( !product ) {
        throw new Error('Invalid prefijo');
    }
}

const validBoolean = async(PC = '') => {

    if ( typeof PC !== 'boolean' ) {
        throw new Error('PC must be a boolean');
    }
}

module.exports = {
    validExistUserByEmail,
    validExistUserByDocument,
    validExistRole,
    validExistUserByID,
    validExistEmailByLogin,
    validExistStationByID,
    validExistZoneByID,
    validExisTaskByID,
    validExistProductByPrefijo,
    validExistProductByID,
    validExistProcessByPrefijo,
    validExistProcessByProduct,
    validExistProcessByID,
    validExistStation,
    validExistStationById,
    validExistZone,
    validFecha,
    validExistPrefijo,
    validBoolean
}