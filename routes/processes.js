const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT,
        superAdminRole } = require('../middlewares');

const { createProcess,
        getProcessByPrefijo, 
        updateProcess, 
        deleteProcess,
        getProcesses } = require('../controllers');

const { validExistProductByID,
        validExistProcessByPrefijo,
        validExistProcessByProduct,
        validExistProcessByID } = require('../helpers/validators');

const router = Router();

router.post('/', [
    validateJWT,
    superAdminRole,
    check('product', 'Product is required').not().isEmpty(),
    check('product', 'Invalid product ID').isMongoId(),
    check('product').custom(validExistProductByID),
    check('product').custom(validExistProcessByProduct),
    check('tasks', 'Task is required').not().isEmpty(),
    validateFields
], createProcess );

router.get('/', [
    validateJWT,
    superAdminRole,
    validateFields
], getProcesses );

router.get('/:prefijo', [
    validateJWT,
    superAdminRole,
    check('prefijo').custom(validExistProcessByPrefijo),
    validateFields
], getProcessByPrefijo );

router.put('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid process ID').isMongoId(),
    check('id').custom(validExistProcessByID),
    validateFields
], updateProcess );

router.delete('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid process ID').isMongoId(),
    check('id').custom(validExistProcessByID),
    validateFields
], deleteProcess );

module.exports = router;