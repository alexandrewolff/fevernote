const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/userModel')
const Note = require('../src/models/noteModel')

let title, content, email, password, user

beforeAll(async () => {
  await User.deleteMany()
  await Note.deleteMany()

  title = 'My title'
  content = 'My test content'
  email = 'joe@gmail.com',
  password = 'asSDd8f7fasd@#$sdaf'
})

beforeEach(async () => {
  user = new User({
    email,
    password,
    isVerified: true
  })

  await user.save()
})

afterEach(async () => {
  await User.deleteMany()
  await Note.deleteMany()
})

test('Should create note', async () => {
  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title,
      content
    })
    .expect(201)

  const note = await Note.findOne({ title })
  expect(note).not.toBeNull()
})

test('Should create note if no content', async () => {
  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title
    })
    .expect(201)

  const note = await Note.findOne({ title })
  expect(note).not.toBeNull()
})

test('Should not create note if not logged in', async () => {
  await request(app)
    .post('/api/note')
    .send({
      title,
      content
    })
    .expect(401)

  const note = await Note.findOne({ title })
  expect(note).toBeNull()
})
