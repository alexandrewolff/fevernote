const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const User = require('../src/models/userModel')

let email, password

beforeAll(async () => {
  await User.deleteMany()

  email = 'joe@gmail.com'
  password = 'asSDd8f7fasd@#$sdaf'
})

afterEach(async () => {
  await User.deleteMany()
})

test('Should signup user', async () => {
  const response = await request(app)
    .post('/api/user')
    .send({
      email,
      password
    })
    .expect(201)

  expect(response.body.password).toBe(undefined)
  expect(response.body.tokens).toBe(undefined)

  const user = await User.findOne({ email })
  expect(user).not.toBeNull()
})

test('Should not signup user if no email', async () => {
  await request(app)
    .post('/api/user')
    .send({
      email: '',
      password
    })
    .expect(400)
})

test('Should not signup user if invalid email', async () => {
  const newEmail = 'joe.com'
  await request(app)
    .post('/api/user')
    .send({
      email: 'joe.com',
      password
    })
    .expect(400)

  const user = await User.findOne({ email: newEmail })
  expect(user).toBeNull()
})

test('Should not signup user if no special character in password', async () => {
  await request(app)
    .post('/api/user')
    .send({
      email,
      password: 'asSDd8f7daf'
    })
    .expect(400)
})

test('Should verify user email', async () => {
  const user = new User({
    email,
    password
  })

  const response = await user.save()

  const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET, { expiresIn: '12h' })

  await request(app)
    .get(`/api/verify/${token}`)
    .send()
    .expect(200)

  const userFromDb = await User.findById(response._id)
  expect(userFromDb.isVerified).toBe(true)
})

test('Should not verify if already verified', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })

  await request(app)
    .get(`/api/verify/${token}`)
    .send()

  const response = await request(app)
    .get(`/api/verify/${token}`)
    .send()
    .expect(400)

  expect(response.error.text).toBe('Email already verified')
})

test('Should not verify if invalid token', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  await request(app)
    .get('/api/verify/invalidtoken')
    .send()
    .expect(404)
})

test('Should resend email verification', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  request(app)
    .post('/api/resend')
    .send({
      email
    })
    .expect(200)
})

test('Should not resend email verication if invalid mail', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  await request(app)
    .post('/api/resend')
    .send({
      email: 'invalid@gmail.com'
    })
    .expect(404)
})

test('Should not resend email verication if already verified', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })

  await request(app)
    .get(`/api/verify/${token}`)
    .send()

  const response = await request(app)
    .post('/api/resend')
    .send({
      email
    })
    .expect(400)

  expect(response.error.text).toBe('Email already verified')
})

test('Should login', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })

  await request(app)
    .get(`/api/verify/${token}`)
    .send()

  await request(app)
    .post('/api/user/login')
    .send({
      email,
      password
    })
    .expect(200)

  const userFromDb = await User.findOne({ email })
  expect(userFromDb.tokens).toHaveLength(1)
})

test('Should not login if not verified', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const response = await request(app)
    .post('/api/user/login')
    .send({
      email,
      password
    })
    .expect(400)

  expect(response.error.text).toBe('User is not verified')

  const userFromDb = await User.findOne({ email })
  expect(userFromDb.tokens).toHaveLength(0)
})

test('Should not login if invalid email', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const response = await request(app)
    .post('/api/user/login')
    .send({
      email: 'invalid@gmail.com',
      password
    })
    .expect(400)

  expect(response.error.text).toBe('Unable to login')

  const userFromDb = await User.findOne({ email })
  expect(userFromDb.tokens).toHaveLength(0)
})

test('Should not login if invalid password', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const response = await request(app)
    .post('/api/user/login')
    .send({
      email,
      password: 'invalidpassword'
    })
    .expect(400)

  expect(response.error.text).toBe('Unable to login')

  const userFromDb = await User.findOne({ email })
  expect(userFromDb.tokens).toHaveLength(0)
})

test('Should logout', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })

  await request(app)
    .get(`/api/verify/${token}`)
    .send()

  const { body } = await request(app)
    .post('/api/user/login')
    .send({
      email,
      password
    })

  await request(app)
    .post('/api/user/logout')
    .set('Authorization', `Bearer ${body.token}`)
    .send()
    .expect(200)

  const userFromDb = await User.findById(body.user._id)
  expect(userFromDb.tokens).toHaveLength(0)
})

test('Should not logout if not logged in', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })

  await request(app)
    .get(`/api/verify/${token}`)
    .send()

  await request(app)
    .post('/api/user/logout')
    .send()
    .expect(401)
})
