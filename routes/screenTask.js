const { Router } = require('express');
const { check } = require('express-validator');

const {createScreen,
        getScreen,
        updateScreen,
        deleteScreen} = require('../controllers/screenTask');

const { validExistStationByID,
        validExistZoneByID, 
        validExisTaskByID } = require('../helpers/validators');

const { validateFields,
        validateJWT,
        superAdminRole,
        hasARole } = require('../middlewares');

const router = Router();

router.post('/',[
    validateFields
],createScreen);

router.get('/',[
    validateFields
],getScreen);

router.patch('/:id',[
    validateFields
],updateScreen);

router.delete('/:id',[
    validateFields
],deleteScreen);

module.exports = router;