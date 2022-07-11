const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');
const { capitalize } = require("../helpers/capitalizeStr");

const createUser = async(req, res = response) => {

    const name = capitalize(req.body.name);
    const lastname = capitalize(req.body.lastname);
    const email = req.body.email.toLowerCase();
    const role = req.body.role.toLowerCase();
    const password = req.body.password;
    const document = req.body.document;

    const user = new User({name, lastname, email, document, role, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    const userAuth = req.userAuth;

    res.json({
        user,
        userAuth
    });
}

const getUsers = async(req, res) => {

    const [total, users] = await Promise.all([
        User.count(),
        User.find()
    ]);

    res.json({
        total,
        users
    });
}

const updateUser = async(req, res) => {

    const { id } = req.params;
    let { name, lastname, email, role, password, document } = req.body;

    if ( name ) {
        name = req.body.name.toLowerCase();
    }

    if ( lastname ) {
        lastname = req.body.lastname.toLowerCase();
    }

    if ( email ) {
        email = req.body.email.toLowerCase();

        const user = await User.findOne({email});

        if ( user ) {
            return res.status(400).json({
                msg: 'The email is already registered'
            });
        }
    }

    if ( role ) {
        role = req.body.role.toLowerCase();

        const rol = await Role.findOne({role});

        if ( !rol ) {
            return res.status(400).json({
                msg: 'Invalid Role'
            });
        }
    }

    if ( password ) {

        if ( password.length < 6 ) {
            return res.status(400).json({
                msg: 'The password must contain at least 6 digits'
            });
        }

        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync( password, salt );
    }

    if ( document ) {

        if ( isNaN(document) ) {
            return res.status(400).json({
                msg: 'The document must contain only numbers'
            });
        }

        const user = await User.findOne({document});

        if ( user ) {
            return res.status(400).json({
                msg: 'The document is already registered'
            });
        }
    }

    const user = await User.findByIdAndUpdate( id, { name, lastname, email, role, password, document }, {new: true} );

    res.json({
        user
    });
}

const deleteUser = async(req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id)

    res.json({
        user
    });
}

const getOperator = async(req, res = response) => {

    const operator = await User.find({role: 'operario_role'});

    res.json({
        operator
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getOperator
}