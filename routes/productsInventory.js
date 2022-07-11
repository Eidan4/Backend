const { Router } = require('express');
const { check } = require('express-validator');

const {createProductInventory,
       getProductsInventory,
       getProductsInventoryId,
       updateProductInventory,
       RestarInventarios } = require('../controllers/productsInventory');

const { validExistStationByID,
        validExistZoneByID, 
        validExisTaskByID } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        superAdminRole,
        hasARole } = require('../middlewares');

const router = Router();

//Agregar Producto al inventario
router.post('/',[
    validateFields
],createProductInventory)

//Ver todo inventario
router.get('/',[
    validateFields
],getProductsInventory)

//Ver el inventario por el id
router.get('/:id',[
    validateFields
],getProductsInventoryId)

router.patch('/SubInventario/:id',[
    validateFields
],RestarInventarios)


router.patch('/:id',[
    validateFields
],updateProductInventory)


module.exports = router;

