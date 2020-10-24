const express = require('express')
const { selectStates } = require('../controllers/states.controller')
const { ensureAuth } = require('../middlewares/authenticated')

const Router = express.Router()

Router.get('/select', ensureAuth, selectStates)

module.exports = Router