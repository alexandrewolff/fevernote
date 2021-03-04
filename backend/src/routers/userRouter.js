const { Router } = require('express')
const User = require('../models/userModel')

const router = new Router()

router.post('/api/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    // user.launchAccountValidation(process.env.APP_URL)
    res.status(201).send(user.toPublicObject())
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
