const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
    validateJWT,
    superAdminRole } = require('../middlewares');

const { getProcessesIntance,
        updatedIntanceDad,
        getIntanceTask,
        updatedIntanceHjoProceso,
        updatedIntanceHjoFinalizo,
        validateOperario,
        restaFecha,
        getProcessesIntanceId } = require('../controllers/processinstance');

const { validExistProductByID,
    validExistProcessByPrefijo,
    validExistProcessByProduct,
    validExistProcessByID } = require('../helpers/validators');
const { validate } = require('../models/processInstance');

const router = Router();

router.get('/', [
    validateFields
], getProcessesIntance );

router.get('/loginOperarios/:id',[
    validateFields
],validateOperario);

router.get('/:id',[
    validateFields
],getIntanceTask);

router.get('/processInstance/:id',[
    validateFields
],getProcessesIntanceId);

//Listo
router.patch('/:id/hijo/:idhijo', [
   check('id', 'Invalid process ID').isMongoId(),
    validateFields
], updatedIntanceHjoProceso);

router.patch('/:id/hijo/:idhijo/finalizar',[
    check('id', 'Invalid process ID').isMongoId(),
    validateFields
],updatedIntanceHjoFinalizo);

router.patch('/statusprocess/:id', [
    check('id', 'Invalid process ID').isMongoId(),
    validateFields
],updatedIntanceDad);

router.patch('/resta/:id/hijo/:idhijo',[
    check('id', 'Invalid process ID').isMongoId(),
    validateFields
],restaFecha)

module.exports = router;

