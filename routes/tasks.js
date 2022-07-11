const { Router } = require('express');
const { check } = require('express-validator');

const { createTask,
        getTasks, 
        updateTask,
        deleteTask} = require('../controllers');

const { validExistStationByID,
        validExistZoneByID, 
        validExisTaskByID } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        superAdminRole,
        hasARole } = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    superAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('station', 'Station is required').not().isEmpty(),
    check('station', 'Invalid Station').isMongoId(),
    check('station').custom(validExistStationByID),
    check('zone', 'Zone is required').not().isEmpty(),
    check('zone', 'Invalid Zone').isMongoId(),
    check('zone').custom(validExistZoneByID),
    check('operarios', 'Operarios is required').not().isEmpty(),
    check('operarios.*').isMongoId(),
    validateFields
], createTask );

router.get('/', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role'),
    validateFields
], getTasks );

router.get('/:id', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role'),
    check('id', 'Invalid station ID').isMongoId(),
    check('id').custom(validExistStationByID),
    validateFields
], getTasks);

router.put('/:id', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role'),
    check('id', 'Invalid task ID').isMongoId(),
    check('id').custom(validExisTaskByID),
    validateFields
], updateTask );

router.delete('/:id', [
    validateJWT,
    superAdminRole,
    check('id', 'Invalid task ID').isMongoId(),
    check('id').custom(validExisTaskByID),
    validateFields
], deleteTask );

module.exports = router;