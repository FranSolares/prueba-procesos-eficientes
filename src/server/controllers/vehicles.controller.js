const connection = require('../database/mysql.connection');
const { insertVehicleQuery, updateVehicleQuery, deleteVehicleQuery, selectJoinVehiclesQuery, searchJoinVehiclesQuery } = require('../queries/vehicles.queries')

const insertVehicle = async (req, res) => {
    const {vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state} = req.body;
    
    try {
        await connection.query(insertVehicleQuery(vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state))
        res.send({message: 'Vehicle Inserted'})
    } catch (err) {
        res.status(400).send({error: 'Error, vehicle not inserted'})
    }
}

const updateVehicle = async (req, res) => {
    const {vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state, vehicle_id} = req.body;

    try {
        await connection.query(updateVehicleQuery(vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state, vehicle_id))
        res.send({message: 'Vehicle Updated'})
    } catch (err) {
        res.status(400).send({error: 'Error, vehicle not updated'})
    }
}

const deleteVehicle = async (req, res) => {
    const {vehicle_id} = req.body;

    try {
        await connection.query(deleteVehicleQuery(vehicle_id))
        res.send({message: 'Vehicle Deleted'})
    } catch (err) {
        res.status(400).send({error: 'Error, vehicle not deleted'})
    }
}

const selectVehicles = async (req, res) => {
    try {
        const data = await connection.query(selectJoinVehiclesQuery)
        res.send({data: data})
    } catch (err) {
        res.status(400).send({error: 'Error in database'})   
    }
}

module.exports = {
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    selectVehicles
}
