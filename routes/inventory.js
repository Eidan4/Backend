const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
    validateJWT,
    superAdminRole } = require('../middlewares');

const { creatInventory,
        getInventory,
        getInventoryId,
        updateInventoryAdd,
        updateInventorySub,
        updateInventoryPrice} = require('../controllers/inventory');

const { validExistProductByID,
    validExistProcessByPrefijo,
    validExistProcessByProduct,
    validExistProcessByID } = require('../helpers/validators');
const { validate } = require('../models/processInstance');

const router = Router();

router.post('/',[
    validateFields
],creatInventory );

router.get('/',[
    validateFields
],getInventory );

router.get('/:id',[
    validateFields
],getInventoryId);

router.patch('/:id',[
    validateFields
],updateInventoryAdd)

router.patch('/sub/:id',[
    validateFields
],updateInventorySub)

router.patch('/price/:id',[
    validateFields
],updateInventoryPrice)

module.exports = router;