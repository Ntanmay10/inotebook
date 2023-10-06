const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Tanmayisagoodb$oy';

const fetchuser = (req, res, next) => {
    //Get The User From JWT Toke And Add Id To Req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please Authenticate Using Valid Token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate Using Valid Token' })
    }
}

module.exports = fetchuser