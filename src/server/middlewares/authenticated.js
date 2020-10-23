const jwt = require('jwt-simple')
const key = process.env.CRYPTING_KEY

exports.ensureAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({message: 'Not authentificated'})
    } else {
        let token = req.headers.authorization.replace(/[""]+/g, '')
        try {
            var payload = jwt.decode(token, key)
            req.user = payload
            next()
        } catch (ex) {
            return res.status(404).send({message: 'Invalid Token'})
        }
    }
}

exports.ensureAuthAdmin = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({message: 'Not authentificated'})
    } else {
        let token = req.headers.authorization.replace(/[""]+/g, '')
        try {
            let payload = jwt.decode(token, key)
            //Revisar si el rol que cumple es ADMIN por medio del token
            if (payload.role === 'ADMIN') {
                req.user = payload
                next()
            } else {
                return res.status(401).send({message: 'Unauthorized'})
            }
        } catch (ex) {
            return res.status(404).send({message: 'Invalid Token'})
        }
    }
}