const { Router } = require('express');
const { check } = require('express-validator');

const { createOrder,
        getOrders } = require('../controllers');

const { validFecha,
        validExistPrefijo,
        validBoolean } = require('../helpers/validators');

const { validateFields,
        validateJWT, 
        hasARole} = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role', 'admin_role'),
    check('cliente', 'Cliente is required').not().isEmpty(),
    check('fechaDeEntrega', 'FechaDeEntrega is required').not().isEmpty(),
    check('fechaDeEntrega').custom(validFecha),
    check('OF', 'OF is required').not().isEmpty(),
    check('OF', 'OF must be a number').isNumeric(),
    check('codigo', 'Codigo is required').not().isEmpty(),
    check('prefijo', 'Prefijo is required').not().isEmpty(),
    check('prefijo').custom(validExistPrefijo),
    check('referencia', 'Referencia is required').not().isEmpty(),
    check('cantidad', 'Cantidad is required').not().isEmpty(),
    check('cantidad', 'Cantidad must be a number').isNumeric(),
    check('NF', 'NF is required').not().isEmpty(),
    check('NF', 'NF must be a number').isNumeric(),
    check('paso', 'Paso is required').not().isEmpty(),
    check('anchoTubo', 'anchoTubo is required').not().isEmpty(),
    check('cantidadTubo', 'cantidadTubo is required').not().isEmpty(),
    check('cantidadTubo', 'cantidadTubo must be a number').isNumeric(),
    check('longitudTubo', 'longitudTubo is required').not().isEmpty(),
    check('anchoAleta', 'anchoAleta is required').not().isEmpty(),
    check('cantidadAleta', 'cantidadAleta is required').not().isEmpty(),
    check('cantidadAleta', 'cantidadAleta must be a number').isNumeric(),
    check('longitudAleta', 'longitudAleta is required').not().isEmpty(),
    check('PC', 'PC is required').not().isEmpty(),
    check('PC').custom(validBoolean),
    check('UES_Colectores', 'UES_Colectores is required').not().isEmpty(),
    validateFields
], createOrder );

router.get('/', [
    validateJWT,
    hasARole('super_admin_role', 'reporte_role', 'admin_role'),
    validateFields
], getOrders );



module.exports = router;