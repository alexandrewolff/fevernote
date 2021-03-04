const request = require('supertest')
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
  await request(app)
    .post('/api/user')
    .send({
      email,
      password
    })
    .expect(201)
  // password and token should be rmoved
  const user = await User.findOne({ email })
  expect(user).not.toBeNull()
})

test('Should NOT signup user if no email', async () => {
  await request(app)
    .post('/api/user')
    .send({
      email: '',
      password
    })
    .expect(400)
})

test('Should NOT signup user if invalid email', async () => {
  const newEmail = 'joe.com'
  await request(app)
    .post('/api/user')
    .send({
      email: newEmail,
      password
    })
    .expect(400)

  const user = await User.findOne({ email: newEmail })
  expect(user).toBeNull()
})

test('Should NOT signup user if no special character in password', async () => {
  await request(app)
    .post('/api/user')
    .send({
      email,
      password: 'asSDd8f7daf'
    })
    .expect(400)
})
