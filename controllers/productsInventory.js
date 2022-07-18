const ProductsInventory = require('./../models/productsInventory');
const Inventory = require("./../models/inventory");
const SubProduct = require('./../models/inventorySubProduct');

//Listo
const createProductInventory = async (req, res=response) => {

    try {
        const name_product = req.body.name_product;
        const {amount_stored,amount_consumption,unit_price,inventory_price,
        inventory_primary,inventory_sub_product} = req.body;
    
        const createProduct = new ProductsInventory({name_product: name_product, amount_stored: amount_stored, amount_consumption: amount_consumption, unit_price: unit_price, 
            inventory_price:inventory_price, inventory_primary:inventory_primary, inventory_sub_product: inventory_sub_product});
        await createProduct.save();
    
        const createProducts = await ProductsInventory.findById(createProduct.id)
            .populate('name_product','name')
            .populate('amount_stored','name')
            .populate('amount_consumption','name')
            .populate('unit_price','name')
            .populate('inventory_price','name')
            .populate('inventory_primary','name')
            .populate('inventory_sub_product','name')
        res.json(createProducts); 
    } catch (error) {
        res.json({
            message: error
        })
    }



    
}

const RestarInventarios = async (req, res=response) =>{
    //Producto de inventario
    const {id} = req.params;

    if(id){
        const ids = await ProductsInventory.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID ProductsInventory'
            });
        }
    }

    const search = await ProductsInventory.findById(id).exec((error,inventarios)=>{
        let prima = inventarios.inventory_primary;
        let amount = inventarios.amount_stored;
        let subproducto = inventarios.inventory_sub_product;
        for (let h = 0; h < subproducto.length; h++){
            const element = subproducto[h].toString();
            SubProduct.findById(element).exec((error,subproductos) => {
                let cantidadSub = 0;
                if( id === "62c4433c85f8cdc973a9d9be"){
                    if(element === "62c3081310e45cf5ff007863"){
                        cantidadSub = 1 * amount;
                    }
                    else if(element==="62c3083210e45cf5ff007868"){
                        cantidadSub = 2 * amount;
                    }
                }
            });
        }



        for(let i = 0; i < prima.length; i++) {
            let convertir = prima[i].toString();
            Inventory.findById(convertir).exec((error,prima)=>{
                if(error) throw error;
                let cantidadSub = 0;
                if(id==="62c4433c85f8cdc973a9d9be"){
                    if(convertir==="62bf08fba9d907280a599d18"){
                        cantidadSub = 5 * amount;
                    }
                    else if(convertir==="62bf6cba6f7d33da1a76a1c5"){
                        cantidadSub = 2 * amount
                    }
                }
                let verificar = (cantidadSub>=prima.amount_stored),
                inventarioUpdate={
                    amount_stored:(verificar) ? 0 : (prima.amount_stored-cantidadSub),
                    amount_consumption: (verificar) ? (prima.amount_consumption+prima.amount_stored):(prima.amount_consumption+cantidadSub)
                }
                Inventory.findByIdAndUpdate(convertir,inventarioUpdate).exec(error=>{
                    if(error) throw error;
                })
            })
        }
        for (let j = 0; j < subproducto.length; j++) {
            const element = subproducto[j].toString();
            SubProduct.findById(element).exec((error,subproductos) => {
                if(error) throw error;
                let cantidadSub = 0;
                if( id === "62c4433c85f8cdc973a9d9be"){
                    if(element === "62c3081310e45cf5ff007863"){
                        cantidadSub = 1 * amount;
                    }
                    else if(element==="62c3083210e45cf5ff007868"){
                        cantidadSub = 2 * amount;
                    }
                }
                let verificar = (cantidadSub<=subproductos.amount_stored),
                inventarioUpdate={
                    amount_stored:(verificar) ? 0 : (subproductos.amount_stored-cantidadSub),
                    amount_consumption: (verificar) ? (subproductos.amount_consumption+prima.amount_stored):(subproductos.amount_consumption+cantidadSub)
                }
                SubProduct.findByIdAndUpdate(element,inventarioUpdate).exec(error=>{
                    if (error) throw error;
                })
            })
            
        }
    });

    res.json('Actualizacion Hecha');
}


//proceso
const getProductsInventory = async (req, res=response) => {
    const products = await ProductsInventory.find();

    res.json({products});

}
//proceso
const getProductsInventoryId = async (req, res=response) => {
    const {id} = req.params;

    if(id){
        const ids = await ProductsInventory.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID ProductsInventory'
            });
        }
    }

    const products = await ProductsInventory.findById(id);

    res.json({products});

}

//En proceso
const updateProductInventory = async (req, res=response) => {
    const {id} = req.params;

    if(id){
        const ids = await ProductsInventory.findById(id);
        if(!ids){
            return res.status(404).json({
                msg: 'Invalid ID ProductsInventory'
            });
        }
    }

    try {
        ProductsInventory.findById(id,{products:1}).exec(function (err, inventory) {
            const idProduct = inventory.products;
            const inventario = Inventory.findById(idProduct)
            res.json({idProduct})
        }) 
    } catch (error) {
        res.json(error)
    }

    
    
    
}

module.exports = {
    createProductInventory,
    getProductsInventory,
    getProductsInventoryId,
    updateProductInventory,
    RestarInventarios
}