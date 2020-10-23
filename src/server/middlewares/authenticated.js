const jwt = require('jwt-simple')
const key = process.env.CRYPTING_KEY

exports.ensureAuth = (req, res, next) => {
    if (!req.body.command) {
        res.send({message: 'Ingrese un comando'})
    } else {
        var commandLine = req.body.command.split(' ')
        var command = commandLine[0]
    }
    
    if (command === 'REGISTER') {
        next()
    }else if (command === 'LOGIN') {
        next()
    }else if (!req.headers.authorization) {
        return res.status(403).send({message: 'Peticion sin autenticación'})
    } else {
        var token = req.headers.authorization.replace(/[""]+/g, '')
        try {
            var payload = jwt.decode(token, key)
        } catch (ex) {
            return res.status(404).send({message: 'Token no válido'})
        }

        req.user = payload
        next()
    }
}
