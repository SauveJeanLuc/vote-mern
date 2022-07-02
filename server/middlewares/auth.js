const jwt = require('jsonwebtoken')

export default function mustBeLoggedIn(req, res, next){
    const token = req.headers('x-access-token');

    if(!token){
        res.send({
            status: '403',
            message: 'Access is Denied - Must be logged in'
        })
    }

    try{
        const decoded = jwt.verify(token, 'secret123')
        req.user = decoded;
        next();
    }catch(err){
        res.send({
            status: '400',
            message: 'Invalid Token'
        })
    }
}