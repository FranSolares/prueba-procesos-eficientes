const connection = require('../database/mysql.connection');
const { insertVehicleQuery, updateVehicleQuery, deleteVehicleQuery, selectJoinVehiclesQuery} = require('../queries/vehicles.queries')

const insertVehicle = (req, res) => {
    const {vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state} = req.body;
    
    connection.query(insertVehicleQuery(vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state), (err, results, fields) => {
        if (err) {
            res.status(400).send({error: 'Error, vehicle not inserted'})
        } else {
            res.send({message: 'Vehicle Inserted'})
        }
    })
}

const updateVehicle = (req, res) => {
    const {vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state, vehicle_id} = req.body;

    connection.query(updateVehicleQuery(vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state, vehicle_id), (err, results, fields) => {
        if (err) {
            res.status(400).send({error: 'Error, vehicle not updated'})
        } else if (results.affectedRows > 0) {
            res.send({message: 'Vehicle Updated'})
        } else {
            res.status(404).send({message: 'Error, vehicle does not exist'})
        }
    })

}

const deleteVehicle = (req, res) => {
    const {vehicle_id} = req.body;

    connection.query(deleteVehicleQuery(vehicle_id), (err, results, fields) => {
        if (err) {
            res.status(400).send({error: 'Error, vehicle not deleted', err})
        } else if (results.affectedRows > 0) {
            res.send({message: 'Vehicle Deleted'})
        } else {
            res.status(404).send({message: 'Error, vehicle does not exist'})
        }
    })

}

const selectVehicles = (req, res) => {

    connection.query(selectJoinVehiclesQuery(), (err, results) => {
        if (err) {
            res.status(400).send({error: 'Error in database', err: err})  
        } else {
            res.send({data: results})
        }
    })

}

module.exports = {
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    selectVehicles
}
