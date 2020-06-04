// stronging all the global middleware here helps clean up the code (thank you whoever showed me this)

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
// importing a higher order function that that takes a param after require
const KnexSessionStore = require('connect-session-knex')(session)

const sessionConfig = {
  name: 'notSession', // sid default
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 35,
    secure: false, // true in production
    httpOnly: true // no javascript code can touch this

  },
  resave: false, // recreate session
  saveUninitialized: false, // GDPR law against setting cookies automatically
  // creates a store method which is a result of a highter order function
  store: new KnexSessionStore({
    // passing the database config
    knex: require('../data/dbConfig'),
    // which table and field name to store session id's in
    tablename: 'sessions',
    sidfieldnames: 'sid',
    // create table if ti doesn't exist
    createtable: true,
    // how often to clean it up
    clearInterval: 1000 * 35
  })
}
module.exports = server => {
  // hides 'powered by express'
  server.use(helmet())
  // allows u sto use json
  server.use(express.json())
  // allows us to use other sites on our websites
  // cors means cross - domain requests
  server.use(cors())
  server.use(morgan('combined'))
  server.use(session(sessionConfig))
}
