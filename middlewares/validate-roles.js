const { response } = require("express");

const superAdminRole = async (req, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'The token must be validated first'
        });
    }

    const { role, name } = req.userAuth;

    if (role !== 'super_admin_role') {
        return res.status(400).json({
            msg: `--${name}-- You are not authorized to do this`
        });
    }

    next();
}

const hasARole = (...roles) => {

    return (req, res = response, next) => {

        if (!req.userAuth) {
            return res.status(500).json({
                msg: 'The token must be validated first'
            });
        }

        const { role, name } = req.userAuth;

        if ( !roles.includes(role) ) {
            return res.status(401).json({
                msg: `--${name}-- You are not authorized to do this`
            });
        }

        next();
    }
}

module.exports = {
    superAdminRole,
    hasARole
}