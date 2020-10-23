const jwt = require('jwt-simple')
const key = process.env.CRYPTING_KEY

exports.createToken = (user) => {
    var payload = {
        sub: user.idUser,
        username: user.user_username,
        password: user.user_password
    }

    return jwt.encode(payload, key)
}