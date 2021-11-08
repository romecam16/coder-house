const ADMIN = true

const isAdmin = ( req, res, next)=>{
    if (ADMIN){
        next()
    } else {
        res.status(403).json({error: -1, description: 'route ' +req.baseUrl + req.path + ' method ' + req.method + ' not authorized'})
    }
}

module.exports = isAdmin    