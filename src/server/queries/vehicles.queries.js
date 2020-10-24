//INSERT QUERY
const insertVehicleQuery = (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) => {
    return `INSERT INTO Vehicles (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) 
        VALUES ('${vehicle_brand}', '${vehicle_model}', ${vehicle_year}, '${vehicle_plate}', ${vehicle_state});`
}

//UPDATE QUERY
const updateVehicleQuery = (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state, vehicle_id) => {
    return `UPDATE Vehicles SET vehicle_brand = '${vehicle_brand}', vehicle_model = '${vehicle_model}', vehicle_year = ${vehicle_year},
     vehicle_plate = '${vehicle_plate}', vehicle_state = ${vehicle_state} WHERE idVehicle = ${vehicle_id}`
}

//DELETE QUERY
const deleteVehicleQuery = (vehicle_id) => {
    return `DELETE FROM Vehicles WHERE idVehicle = ${vehicle_id}`
}

//SELECT QUERY
const selectAllVehiclesQuery = () => {
    return `SELECT * FROM Vehicles`
};

//INNER JOIN BETWEEN TABLE VEHICLES AND VEHICLE_STATES
const selectJoinVehiclesQuery = () => {
    return `SELECT idVehicle, vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state, state_name FROM Vehicles INNER JOIN Vehicle_States ON vehicle_state = idState ORDER BY idVehicle`
}

module.exports = {
    insertVehicleQuery,
    updateVehicleQuery,
    deleteVehicleQuery,
    selectAllVehiclesQuery,
    selectJoinVehiclesQuery
}
