const auth = require('./auth');
const orders = require('./orders');
const processes = require('./processes');
const product = require('./products');
const stations = require('./stations');
const tasks = require('./tasks');
const users = require('./users');
const zones = require('./zones');
const processInstance = require('./processinstance');
const inventory = require('./inventory');
const productsInventory = require('./productsInventory');
const inventorySubProduct = require('./inventorySubProduct');
const taskstation = require('./task-station');
const screenTask = require('./screenTask');

module.exports = {
    ...auth,
    ...orders,
    ...processes,
    ...product,
    ...stations,    
    ...tasks,
    ...users,
    ...zones,
    ...processInstance,
    ...inventory,
    ...productsInventory,
    ...inventorySubProduct,
    ...taskstation,
    ...screenTask
}