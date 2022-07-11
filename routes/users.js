const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { getUsers,
        createUser,
        updateUser,
        deleteUser, 
        getOperator} = require('../controllers');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/', [
    validateJWT,
    superAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( validExistUserByEmail ),
    check('password', 'The password must contain at least 6 digits').isLength({ min: 6 }),
    check('document', 'Document is required').not().isEmpty(),
    check('document', 'Invalid document').isNumeric(),
    check('document').custom( validExistUserByDocument ),
    check('role', 'Role is required').not().isEmpty(),
    check('role').custom( validExistRole ),
    validateFields
], createUser );

router.get('/', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role'),
    validateFields
], getUsers );

router.put('/:id', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role'),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validExistUserByID),
    validateFields
], updateUser );

router.delete('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validExistUserByID),
    validateFields
], deleteUser );

router.get('/operator', [
    validateJWT,
    superAdminRole,
    validateFields
], getOperator );

module.exports = router;