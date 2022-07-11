const { response } = require("express");

const Inventory = require("./../models/inventory");

//Crear un producto de inventario
const creatInventory = async (req, res = response) => {
    const name_primary = req.body.name_primary;
    const {amount_stored}= req.body;
    const {amount_consumption} = req.body;
    const {unit_price} = req.body;
    const {station} = req.body;
    const {product} = req.body;
    const {inventory_price} = req.body;

    const inventory = new Inventory({name_primary:name_primary,amount_stored:amount_stored,amount_consumption:amount_consumption,
        unit_price:unit_price,station:station,product:product,inventory_price:inventory_price});

    await inventory.save();

    const inventorys =  await Inventory.findById(inventory.id)
        .populate('name_primary', 'name_primary')
        .populate('amount_stored', 'amount_stored')
        .populate('amount_consumption', 'amount_consumption')
        .populate('unit_price', 'unit_price')
        .populate('station', 'station')
        .populate('product', 'product')
        
    Inventory.findById(inventory.id,{_id:0,amount_stored:1,unit_price:1,inventory_price:1}).exec((error,inventario)=>{
        if(error) {
            console.log(error)
            res.send("")
            return
        }
        let total = {inventory_price:inventario.amount_stored*inventario.unit_price}
        Inventory.findByIdAndUpdate(inventory.id,total).exec(error=>{
            if(error) {
                console.log(error)
                res.send("")
            }
        })
    })
    res.json(inventorys);
}

//Llamar todo el inventario
const getInventory = async (req, res = response) => {
    const inventory = await Inventory.find();
    res.json({ inventory })
}

//Llamar un inventario en especifico
const getInventoryId= async(req, res = response) => {
    const {id} = req.params;
    const inventory = await Inventory.findById(id);
    res.json({ inventory })
}

//Agregar una cantidad al inventario
const updateInventoryAdd = async (req, res = response)=>{
    const {id} = req.params;
    cantidadplus = parseInt(req.body.amountadd);

    if(cantidadplus===0){
        res.send("")
        return
    }

    Inventory.findById(id,{_id:0,amount_stored:1,inventory_price:1}).exec((error,inventario)=>{
        if(error){
            console.log(`Error en actualizacion ${error}`)
            res.send("")
            return
        }
        let intertoryupdate = {amount_stored:inventario.amount_stored+cantidadplus}
            Inventory.findByIdAndUpdate(id,intertoryupdate).exec(error=>{
                if(error) {
                    console.log(`Error en actualizacion ${error}`)
                    res.send("")
                }
            })
    })

    res.json("Cantidad agregada");
}

//Restar una cantidad al inventario
const updateInventorySub= async (req, res = response) => {
    const{id}= req.params;
    cantidadSub=parseInt(req.body.cantidadSub)

    if(cantidadSub===0){
        res.send("")
        return
    }

    const buscar = Inventory.findById(id,{_id:0,amount_stored:1,amount_consumption:1,product:1}).exec((error,inventario)=>{
        if(error){
            console.log(`Error en actualizacion ${error}`)
            res.send("")
            return
        }

        let verificar = (cantidadSub>=inventario.amount_stored),
            inventarioUpdate={
                amount_stored:(verificar) ? 0 : (inventario.amount_stored-cantidadSub),
                amount_consumption: (verificar) ? (inventario.amount_consumption+inventario.amount_stored):(inventario.amount_consumption+cantidadSub)
            }
        
            Inventory.findByIdAndUpdate(id,inventarioUpdate).exec(error =>{
                if(error){
                    console.log(`Error al actualizar el almacen: ${error}`)
                    res.send("")
                }else{
                    res.json(buscar)
                }
            })
        })

    res.json("Se resto correctamente");       
}

//actualizar el precio total
const updateInventoryPrice = async (req, res = response ) =>{
    const {id} = req.params;

    const busqueda =  await Inventory.findById(id,{_id:0,amount_stored:1,unit_price:1,inventory_price:1}).exec((error,inventario)=>{
        if(error){
            console.log(`Error en actualizacion ${error}`)
            res.send("")
            return
        }
        let total = inventario.inventory_price;
        let cantidad = inventario.amount_stored;
        let precio = inventario.unit_price
        let mul = {inventory_price:cantidad*precio};
        const update = Inventory.findByIdAndUpdate(id,mul).exec(error=>{
            if(error){
                console.log(`Error en actualizacion ${error}`)
            }            
        })
        res.json("Actualizacion Correctamente")
    })
      
}
    


module.exports = {
    creatInventory,
    getInventory,
    getInventoryId,
    updateInventoryAdd,
    updateInventorySub,
    updateInventoryPrice
};