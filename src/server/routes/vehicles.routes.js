const express = require('express')
const {insertVehicle, updateVehicle, deleteVehicle, selectVehicles} = require('../controllers/vehicles.controller')
const { ensureAuth, ensureAuthAdmin } = require('../middlewares/authenticated')

const Router = express.Router()

Router.post('/insert', ensureAuth, insertVehicle)
Router.put('/update',ensureAuthAdmin, updateVehicle)
Router.delete('/delete',ensureAuth, deleteVehicle)
Router.get('/select',ensureAuth, selectVehicles)

module.exports = Router