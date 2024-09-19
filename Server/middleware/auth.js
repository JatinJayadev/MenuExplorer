const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.secret;


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token: " + token)

    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = authenticateToken;