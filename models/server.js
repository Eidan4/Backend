const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 9000;
        this.path = {
            auth:  '/api/auth',
            orders: '/api/orders',
            processes: '/api/processes',
            products: '/api/products',
            stations: '/api/stations',
            tasks: '/api/tasks',
            users: '/api/users',
            zones: '/api/zones',
            pruebas: '/api/processinstance',
            inventory: '/api/inventory',
            productsInventory: '/api/productsInventory',
            inventorySubProduct: '/api/InventorySubProduct',
            taskstation: '/api/taskstation',
            // television:'/api/television',
        };

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.orders, require('../routes/orders'));
        this.app.use(this.path.processes, require('../routes/processes'));
        this.app.use(this.path.products, require('../routes/products'));
        this.app.use(this.path.stations, require('../routes/stations'));
        this.app.use(this.path.tasks, require('../routes/tasks'));
        this.app.use(this.path.users, require('../routes/users'));
        this.app.use(this.path.zones, require('../routes/zones'));
        this.app.use(this.path.pruebas, require('../routes/processinstance'));
        this.app.use(this.path.inventory,require('../routes/inventory'));
        this.app.use(this.path.productsInventory,require('./../routes/productsInventory'));
        this.app.use(this.path.inventorySubProduct, require('./../routes/inventorySubProduct'));
        this.app.use(this.path.taskstation, require('../routes/task-station'));
        // this.app.use(this.path.television, require('../routes/screenTask'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;