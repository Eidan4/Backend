const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generar-jwt");
const User = require("../models/user");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({email});

        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Invalid email/password'
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Contact administrator'
        });
    }
}

module.exports = {
    login
}