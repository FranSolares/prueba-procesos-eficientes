require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const vehicleRoutes = require('./routes/vehicles.routes')
const statesRoutes = require('./routes/states.routes')
const cors = require('cors')
const app = express()

const PORT = process.env.SERVER_PORT || 3500

//Permite a las peticiones usar objetos JSON
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Se configura cors en el servidor
app.use(cors())

//RUTAS
app.use('/vehicles', vehicleRoutes)
app.use('/user', userRoutes)
app.use('/states', statesRoutes)

app.listen(PORT, () => {console.log(`Server listening on port: ${PORT}`)})
