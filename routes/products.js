const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct,
        getProductsByPrefijo, 
        updateProduct,
        deleteProduct} = require('../controllers');

const { validExistProductByPrefijo,
        validExistProductByID } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        superAdminRole,
        hasARole } = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    superAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('prefijo', 'Prefijo is required').not().isEmpty(),
    check('prefijo').custom(validExistProductByPrefijo),
    validateFields
], createProduct );

router.get('/', [
 
    validateFields
], getProductsByPrefijo );

router.put('/:id', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role'),
    check('id', 'Invalid product ID').isMongoId(),
    check('id').custom(validExistProductByID),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid product ID').isMongoId(),
    check('id').custom(validExistProductByID),
    validateFields
], deleteProduct );

module.exports = router;