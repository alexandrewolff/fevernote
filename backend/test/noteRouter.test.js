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
  email = 'joe@gmail.com'
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

test('Should get notes', async () => {
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

  const response = await request(app)
    .get('/api/notes')
    .set('Authorization', `Bearer ${body.token}`)
    .expect(200)

  expect(response.body).toHaveLength(1)
})

test('Should not get notes if not logged in', async () => {
  await request(app)
    .get('/api/notes')
    .expect(401)
})

test('Should update note', async () => {
  const newTitle = 'New title'
  const newContent = 'New content'

  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  const response = await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title,
      content
    })
    .expect(201)

  await request(app)
    .put(`/api/note/${response.body._id}`)
    .set('Authorization', `Bearer ${body.token}`)
    .send({ title: newTitle, content: newContent })
    .expect(200)

  const note = await Note.findOne({ _id: response.body._id })
  expect(note.title).toBe(newTitle)
  expect(note.content).toBe(newContent)
})

test('Should not update note if invalid id', async () => {
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

  await request(app)
    .put('/api/note/invalidId')
    .set('Authorization', `Bearer ${body.token}`)
    .send({ title: 'New title', content: 'New content' })
    .expect(400)
})

test('Should not update note if not logged in', async () => {
  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  const response = await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title,
      content
    })
    .expect(201)

  await request(app)
    .put(`/api/note/${response.body._id}`)
    .send({ title: 'New title', content: 'New content' })
    .expect(401)

  const note = await Note.findOne({ _id: response.body._id })
  expect(note.title).toBe(title)
  expect(note.content).toBe(content)
})

test('Should not update note if invalid fields provided', async () => {
  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  const response = await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title,
      content
    })
    .expect(201)

  await request(app)
    .put(`/api/note/${response.body._id}`)
    .set('Authorization', `Bearer ${body.token}`)
    .send({ title: 'New title', content: 'New content', invalidField: 'Lorem' })
    .expect(400)

  const note = await Note.findOne({ _id: response.body._id })
  expect(note.title).toBe(title)
  expect(note.content).toBe(content)
  expect(note.invalidField).toBeUndefined()
})

test('Should delete note', async () => {
  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  const response = await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title,
      content
    })
    .expect(201)

  await request(app)
    .delete(`/api/note/${response.body._id}`)
    .set('Authorization', `Bearer ${body.token}`)
    .expect(200)

  const note = await Note.findOne({ _id: response.body._id })
  expect(note).toBeNull()
})

test('Should not delete note if not logged in', async () => {
  const { body } = await request(app)
    .post('/api/login')
    .send({
      email,
      password
    })
    .expect(200)

  const response = await request(app)
    .post('/api/note')
    .set('Authorization', `Bearer ${body.token}`)
    .send({
      title,
      content
    })
    .expect(201)

  await request(app)
    .delete(`/api/note/${response.body._id}`)
    .expect(401)

  const note = await Note.findOne({ _id: response.body._id })
  expect(note).not.toBeNull()
})

test('Should not delete note if invalid id', async () => {
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

  await request(app)
    .delete('/api/note/invalidId')
    .set('Authorization', `Bearer ${body.token}`)
    .expect(500)
})
