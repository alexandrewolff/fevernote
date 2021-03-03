const { Router } = require('express')
const User = require('../models/userModel')

const router = new Router()

router.post('/api/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user.toPublicObject())
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
