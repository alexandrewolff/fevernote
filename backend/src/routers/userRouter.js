const { Router } = require('express')
const User = require('../models/userModel')
const { decodeToken } = require('../helpers/token')

const router = new Router()

router.post('/api/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    user.launchAccountValidation(process.env.APP_URL)
    res.status(201).send(user.toPublicObject())
  } catch (error) {
    if (error.keyPattern && error.keyPattern.email === 1) {
      return res.status(400).send('Email already used')
    }

    res.status(400).send(error)
  }
})

router.get('/api/verify/:token', async (req, res) => {
  let tokenPayload

  try {
    tokenPayload = decodeToken(req.params.token)
  } catch {
    return res.status(404).send()
  }

  const user = await User.findOne({ _id: tokenPayload.id })

  if (!user) {
    return res.status(404).send()
  }

  if (user.isVerified) {
    return res.status(400).send('Email already verified')
  }

  try {
    await user.validateAccount()
    res.status(200).send(user.toPublicObject())
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/api/resend', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).send()
  }

  if (user.isVerified) {
    return res.status(400).send('Email already verified')
  }

  user.launchAccountValidation(process.env.APP_URL)

  res.status(200).send()
})

router.post('/api/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)

    if (!user.isVerified) {
      return res.status(400).send('User is not verified')
    }

    await user.populateAuthToken()

    const lastToken = user.tokens.slice(-1)[0]

    res.send({
      user: user.toPublicObject(),
      token: lastToken
    })
  } catch {
    res.status(400).send()
  }
})

module.exports = router
