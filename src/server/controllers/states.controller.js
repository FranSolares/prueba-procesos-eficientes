const connection = require("../database/mysql.connection")
const { selectAllStatesQuery } = require("../queries/states.queries")

const selectStates = (req, res) => {

    connection.query(selectAllStatesQuery(), (err, results) => {
        if (err) {
            res.status(503).send({error: 'Error in database'})  
        } else {
            res.send({data: results})
        }
    })

}

module.exports = {
    selectStates
}