require('dotenv').config()
const express = require('express')
const vehicleRoutes = require('./routes/vehicles.routes')
const app = express()

app.use('/vehicles', vehicleRoutes)

const PORT = process.env.SERVER_PORT || 3500

app.listen(PORT, () => {console.log(`Server listening on port: ${PORT}`)})
