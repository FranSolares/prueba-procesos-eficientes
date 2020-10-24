const {insertUserQuery, selectUserQuery, searchUserQuery} = require('../queries/user.queries')
const bcrypt = require('bcrypt')
const jwt = require('../services/jwt')
const connection = require('../database/mysql.connection')

const registerUser = (req, res) => {
    const {username, password} = req.body;
    
    connection.query(selectUserQuery(username), async (err, result, fields) => {
        if (err) {
            res.status(503).send({error: 'Something went wrong, try again'})
        } else if (result.length > 0) {
            res.status(400).send({message: 'Username already taken'})
        } else {
            const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(5))
            connection.query(insertUserQuery(username, hashPassword), (err, result, fields) => {
                if (err) {
                    res.status(400).send({error: 'Error registering, try again'})
                } else {
                    connection.query(searchUserQuery(result.insertId), (err, results, fields) => {
                        if (err) {
                            res.status(503).send({error: 'Something went wrong, try again'})
                        } else {
                            res.send({message: 'User Registered', token: jwt.createToken(results[0])})
                        }
                    })
                }
            })
        }
    })
}

const loginUser = (req, res) => {
    const {username, password} = req.body;
    
    connection.query(selectUserQuery(username), async (err, result, fields) => {
        if (err) {
            res.status(503).send({error: 'Something went wrong, try again', err})
        } else if (result.length > 0) {
            const comparedPassword = await bcrypt.compare(password, result[0].user_password)
            if (comparedPassword === true) {
                res.send({token: jwt.createToken(result[0])})
            } else {
                res.status(400).send({message: 'Username or password are incorrect'})
            }
        } else {
            res.status(404).send({error: 'Username not found'})
        }
    })
}


module.exports = {
    registerUser,
    loginUser
}
