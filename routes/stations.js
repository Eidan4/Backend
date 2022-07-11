const { Router } = require('express');
const { check } = require('express-validator');

const { getStations,
        createStation,
        updateStation, 
        deleteStation} = require('../controllers');

const { validExistStation, validExistStationById } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        hasARole, 
        superAdminRole} = require('../middlewares');

const router = Router();

router.get( '/', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role', 'admin_role'),
    validateFields,
], getStations );

router.post('/', [
    validateJWT,
    superAdminRole,
    check('station', 'Station is required').not().isEmpty(),
    check('station').custom(validExistStation),
    validateFields
], createStation );

router.put('/:id', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role', 'admin_role'),
    check('id', 'Invalid station ID').isMongoId(),
    check('id').custom(validExistStationById),
    validateFields
], updateStation );

router.delete('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid station ID').isMongoId(),
    check('id').custom(validExistStationById),
    validateFields
], deleteStation );

module.exports = router;