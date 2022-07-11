const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers');

const { validExistEmailByLogin } = require('../helpers/validators');

const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('email').custom(validExistEmailByLogin),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login );

module.exports = router;