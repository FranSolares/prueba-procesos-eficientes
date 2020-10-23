require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const vehicleRoutes = require('./routes/vehicles.routes')
const app = express()

const PORT = process.env.SERVER_PORT || 3500

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/vehicles', vehicleRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {console.log(`Server listening on port: ${PORT}`)})
