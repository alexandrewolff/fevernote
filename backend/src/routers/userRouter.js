const { Router } = require('express')
const User = require('../models/userModel')
const auth = require('../middleware/auth')
const { decodeToken } = require('../helpers/token')

const ACCOUNT_VALIDATION_EXPIRATION_TIME = '12h'
const LOGIN_EXPIRATION_TIME = '1h'

const router = new Router()

router.post('/api/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    user.launchAccountValidation(process.env.APP_URL, ACCOUNT_VALIDATION_EXPIRATION_TIME)
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

router.post('/api/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)

    if (!user.isVerified) {
      return res.status(400).send('User is not verified')
    }

    await user.populateAuthToken(LOGIN_EXPIRATION_TIME)

    const lastToken = user.tokens.slice(-1)[0]

    res.send({
      user: user.toPublicObject(),
      token: lastToken,
      expiration: LOGIN_EXPIRATION_TIME
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/api/logout', auth, async (req, res) => {
  req.user.tokens = req.user.tokens.filter(token => token !== req.token)

  try {
    await req.user.save()
    res.status(200).send()
  } catch {
    res.status(500).send()
  }
})

module.exports = router
