const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

connection.connect((err)=> {
    if (err) {
        console.log('Error in Connection', err)
    } else {
        console.log('Database Connected')
    }
})

module.exports = connection
