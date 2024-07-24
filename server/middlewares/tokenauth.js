const jwt = require('jsonwebtoken');

module.exports  = async function  (req, res, next) {
    const token = req.header('x-auth-token');
    if (token===null) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, "event-management-2005" );
        req.body = decoded.user;
        next();
    } catch (err) {
        res.status(401).json('Token is not valid');
    }
};
