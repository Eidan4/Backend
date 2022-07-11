const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
    validateJWT,
    superAdminRole } = require('../middlewares');

const { create,
        RestarInventario,
        updateSubProductAdd,
        updateSubProductPrice,
        getIdSubProduct,
        getSubProduct} = require('../controllers/inventorySubProduct');

const { validExistProductByID,
    validExistProcessByPrefijo,
    validExistProcessByProduct,
    validExistProcessByID } = require('../helpers/validators');
const { validate } = require('../models/processInstance');

const router = Router();

//Agrega un SubProduct
router.post('/',[
    validateFields
],create);

//Restar al Inventario de materia prima
router.patch('/:id',[
    validateFields
],RestarInventario);

//Agregar Cantidad
router.patch('/subproducto_add/:id',[
    validateFields
],updateSubProductAdd);


//actualizar Precio Total del Inventario
router.patch('/subproduct_precio/:id',[
    validateFields
],updateSubProductPrice);

router.get('/',[
    validateFields
],getSubProduct);

router.get('/:id',[
    validateFields
],getIdSubProduct);

module.exports = router;
