const { response } = require("express");

const Product = require("../models/product");

const createProduct = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const prefijo = req.body.prefijo.toUpperCase();

    const product = new Product({name, prefijo});

    await product.save();

    res.json({
        product
    });
}

const getProductsByPrefijo = async(req, res = response) => {

    const product = await Product.find();

    res.json({
        product
    });
}

const updateProduct = async(req, res = response) => {

    const { id } = req.params;

    let name = req.body.name;
    let prefijo = req.body.prefijo;

    if (name) {
        name = name.toUpperCase();
    }

    if (prefijo) {

        prefijo = prefijo.toUpperCase();

        const product = await Product.findOne({prefijo});

        if (product) {
            return res.status(401).json({
                msg: `El prefijo: ${prefijo} ya pertenece a un producto`
            });
        }
    }

    const product = await Product.findByIdAndUpdate(id, {name, prefijo}, {new: true});

    res.json({
        product
    });
}

const deleteProduct = async(req, res = response) => {

    const { id } = req.params;

    const product = await Product.findByIdAndRemove(id);

    res.json({
        product
    });
}

module.exports = {
    createProduct,
    getProductsByPrefijo,
    updateProduct,
    deleteProduct
}