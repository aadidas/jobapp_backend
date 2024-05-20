const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if(err) res.status(403).json({ message: "Invalid token" })
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({message: "You are not authenticated"})
    }
};

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id) {
            next();
        } else {
            res.status(401).json({message: 'You are not authorized to performing this operation'})
        }
    })
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('user', req.user.admin);
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({message: 'You are not authorized to performing this operation'})
        }
    })
};


module.exports = {verifyToken, verifyAndAuthorization, verifyAdmin};