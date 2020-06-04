
const router = require('express').Router()
const auth = require('../auth/auth')
const users = require('../users/users')
// using restricted.js as a global middleware to check if a session is active before giving the list of users
const restricted = require('../auth/restricted-middleware')

// all routers start with /api from server.js and then assigned to their own path
router.use('/auth', auth)
router.use('/users', restricted, users)

module.exports = router
