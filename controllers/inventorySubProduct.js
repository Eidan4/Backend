const { response } = require("express");

const InventorySubProduct = require('../models/inventorySubProduct');
const Inventory = require('../models/inventory')

//Agrega un SubProduct
const create = async(req, res = response) => {
    const name_sub = req.body.name_sub;
    const {amount_stored,unit_price,inventory_price,
    product,materia_prima} = req.body;

    const sub = new InventorySubProduct({name_sub:name_sub, amount_stored:amount_stored, unit_price:unit_price, inventory_price:inventory_price,
        product: product, materia_prima:materia_prima});
    
    await sub.save();

    const subs = await InventorySubProduct.findById(sub.id)
        .populate('name_sub', 'name_sub')
        .populate('amount_stored', 'amount_stored')
        .populate('unit_price', 'unit_price')
        .populate('inventory_price', 'inventory_price')
        .populate('product', 'product')
        .populate('materia_prima', 'materia_prima')

    res.json(subs)
    
}

//Restar al Inventario de materia prima (Falta poner la materia prima) solo usar cuando se crea el SubProduct
const RestarInventario = async(req, res = response) => {
    const {id} = req.params;

    const search = await InventorySubProduct.findById(id).exec((error,subproduct)=>{
        let inventory = subproduct.materia_prima;
        let amount = subproduct.amount_stored;
        for(let i = 0; i < inventory.length; i++) {
            let convertir = inventory[i].toString();
            Inventory.findById(convertir).exec((error,inventario)=>{
                if(error){
                    console.log(`Error al actualizar almacen: ${error}`)
                    res.send("")
                }
                let cantidadSub = 0;
                if( id === "62c3081310e45cf5ff007863" && convertir==="62bf08fba9d907280a599d18"){
                    cantidadSub = 20 * amount;
                }
                else if(id === "62c3081310e45cf5ff007863" && convertir==="62bf6cba6f7d33da1a76a1c5"){
                    cantidadSub = 10 * amount;
                }
                else if(id === "62c3083210e45cf5ff007868" && convertir==="62bf08fba9d907280a599d18"){
                    cantidadSub = 15 * amount;
                }
                else if(id === "62c3083210e45cf5ff007868" && convertir==="62bf6cba6f7d33da1a76a1c5"){
                    cantidadSub = 25 * amount;
                }
                console.log(amount)
  
                let verificar = (cantidadSub>=inventario.amount_stored),
                inventarioUpdate={
                    amount_stored:(verificar) ? 0 : (inventario.amount_stored-cantidadSub),
                    amount_consumption: (verificar) ? (inventario.amount_consumption+inventario.amount_stored):(inventario.amount_consumption+cantidadSub)
                }
                Inventory.findByIdAndUpdate(convertir,inventarioUpdate).exec(error=>{
                    if(error){
                        console.log(`Error al actualizar el almacen: ${error}`)
                        res.send("")
                    }
                })
            })
        }
    });

    res.json("Actualizacion Hecha");
}

//Agregar Cantidad (Ya tiene la actualizacion de la resta de la materia prima)
const updateSubProductAdd = async (req, res = response)=>{
    const {id} = req.params;
    cantidadplus = parseInt(req.body.amountadd);

    if(cantidadplus===0){
        res.send("")
        return
    }

    InventorySubProduct.findById(id,{_id:0,amount_stored:1,inventory_price:1}).exec((error,inventario)=>{
        if(error){
            console.log(`Error en actualizacion ${error}`)
            res.send("")
            return
        }
        let intertoryupdate = {amount_stored:inventario.amount_stored+cantidadplus}
            InventorySubProduct.findByIdAndUpdate(id,intertoryupdate).exec(error=>{
                if(error) {
                    console.log(`Error en actualizacion ${error}`)
                    res.send("")
                }
            })
    })
    const search = await InventorySubProduct.findById(id).exec((error,subproduct)=>{
        let inventory = subproduct.materia_prima;
        for(let i = 0; i < inventory.length; i++) {
            let convertir = inventory[i].toString();
            Inventory.findById(convertir).exec((error,inventario)=>{
                if(error){
                    console.log(`Error al actualizar almacen: ${error}`)
                    res.send("")
                }
                let cantidadSub = 0;
                if( id === "62c3081310e45cf5ff007863" && convertir==="62bf08fba9d907280a599d18"){
                    cantidadSub = 20 * cantidadplus;
                }
                else if(id === "62c3081310e45cf5ff007863" && convertir==="62bf6cba6f7d33da1a76a1c5"){
                    cantidadSub = 10 * cantidadplus;
                }
                else if(id === "62c3083210e45cf5ff007868" && convertir==="62bf08fba9d907280a599d18"){
                    cantidadSub = 15 * cantidadplus;
                }
                else if(id === "62c3083210e45cf5ff007868" && convertir==="62bf6cba6f7d33da1a76a1c5"){
                    cantidadSub = 25 * cantidadplus;
                }
                console.log(cantidadplus)
  
                let verificar = (cantidadSub>=inventario.amount_stored),
                inventarioUpdate={
                    amount_stored:(verificar) ? 0 : (inventario.amount_stored-cantidadSub),
                    amount_consumption: (verificar) ? (inventario.amount_consumption+inventario.amount_stored):(inventario.amount_consumption+cantidadSub)
                }
                Inventory.findByIdAndUpdate(convertir,inventarioUpdate).exec(error=>{
                    if(error){
                        console.log(`Error al actualizar el almacen: ${error}`)
                        res.send("")
                    }
                })
            })
        }
    });

    res.json("Cantidad agregada");
}

//actualizar Precio Total del Inventario
const updateSubProductPrice = async (req, res = response ) =>{
    const {id} = req.params;

    const busqueda =  await InventorySubProduct.findById(id,{_id:0,amount_stored:1,unit_price:1,inventory_price:1}).exec((error,inventario)=>{
        if(error){
            console.log(`Error en actualizacion ${error}`)
            res.send("")
            return
        }
        let cantidad = inventario.amount_stored;
        let precio = inventario.unit_price
        let mul = {inventory_price:cantidad*precio};
        const update = InventorySubProduct.findByIdAndUpdate(id,mul).exec(error=>{
            if(error){
                console.log(`Error en actualizacion ${error}`)
            }            
        })
        res.json("Actualizacion Correctamente")
    })
      
}

//ver todos los SubProduct
const getSubProduct = async (req, res = response) => {
    const inventory = await InventorySubProduct.find();
    res.json(inventory)
}

//ver por el id el SubProduct
const getIdSubProduct = async (req, res = response) => {
    const {id} = req.params;
    const inventory = await InventorySubProduct.findById(id);
    res.json(inventory);
}

module.exports = {
    create,
    RestarInventario,
    updateSubProductAdd,
    updateSubProductPrice,
    getSubProduct,
    getIdSubProduct
};