const express = require('express')
const {insertVehicle, updateVehicle, deleteVehicle, selectVehicles} = require('../controllers/vehicles.controller')

const Router = express.Router()

Router.post('/insert', insertVehicle)
Router.put('/update', updateVehicle)
Router.delete('/delete', deleteVehicle)
Router.get('/select', selectVehicles)

module.exports = Router