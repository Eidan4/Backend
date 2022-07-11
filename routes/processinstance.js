const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
    validateJWT,
    superAdminRole } = require('../middlewares');

const { getProcessesIntance,
        updatedIntanceDad,
        getIntanceTask,
        updatedIntance } = require('../controllers/processinstance');

const { validExistProductByID,
    validExistProcessByPrefijo,
    validExistProcessByProduct,
    validExistProcessByID } = require('../helpers/validators');
const { validate } = require('../models/processInstance');

const router = Router();

router.get('/', [
    validateFields
], getProcessesIntance );

router.get('/:id',[
    validateFields
],getIntanceTask);

router.patch('/:id', [
   check('id', 'Invalid process ID').isMongoId(),
    validateFields
], updatedIntance );

router.patch('/statusprocess/:id', [
    check('id', 'Invalid process ID').isMongoId(),
    validateFields
],updatedIntanceDad);

module.exports = router;

