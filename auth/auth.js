const bcrypt = require('bcryptjs')
const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/', (req, res) => {
  console.log(req.body)
  res.json({ api: "It's alive" })
})

router.post('/register', (req, res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json({ saved })
    })
    .catch(() => {
      res.status(500).json('not working')
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username })
    .then((user) => {
      console.log(user)
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user
        res.status(200).json({ message: `Welcome ${user.username}!` })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.send('unable to logout')
    } else {
      res.send('logged out')
    }
  })
})

module.exports = router
