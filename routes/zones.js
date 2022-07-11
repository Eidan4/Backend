const { Router } = require('express');
const { check } = require('express-validator');

const { createZone,
        getZone,
        updateZone, 
        deleteZone } = require('../controllers');

const { validExistZone,
        validExistZoneByID } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        superAdminRole,
        hasARole } = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    superAdminRole,
    check('zone', 'Zone sis required').not().isEmpty(),
    check('zone').custom(validExistZone),
    validateFields
], createZone );

router.get('/', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role', 'admin_role'),
    validateFields
], getZone );

router.put('/:id', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role', 'admin_role'),
    check('id', 'Invalid zona ID').isMongoId(),
    check('id').custom(validExistZoneByID),
    validateFields
], updateZone );

router.delete('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid zona ID').isMongoId(),
    check('id').custom(validExistZoneByID),
    validateFields
], deleteZone );

module.exports = router;