const express = require('express')
const apiRouter = require('./api-router')
const configure = require('./config-middleware')

const server = express()

configure(server)

// assigns '/api/ to every router in apiRouter
server.use('/api', apiRouter)

module.exports = server
