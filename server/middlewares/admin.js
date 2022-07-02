export default function mustBeAdmin( req, res, next ) {
    if(!req.user.isAdmin) {
        res.send({
            status: '403',
            message: 'Access is Denied'
        })
    }
    next();
}