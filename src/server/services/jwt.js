const jwt = require('jwt-simple')
const key = process.env.CRYPTING_KEY


//Funcione que me genera los token con el id, username y rol
exports.createToken = (user) => {
    var payload = {
        sub: user.idUser,
        username: user.user_username,
        role: user.user_role
    }

    return jwt.encode(payload, key)
}