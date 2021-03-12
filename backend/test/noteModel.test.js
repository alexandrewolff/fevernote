const mongoose = require('mongoose')
const Note = require('../src/models/noteModel')

let userId, title, content

beforeAll(async () => {
  require('../src/db/mongoose')

  userId = new mongoose.Types.ObjectId()
  title = 'My title'
  content = 'My test content'

  await Note.deleteMany()
})

afterEach(async () => {
  await Note.deleteMany()
})

afterAll(() => {
  mongoose.connection.close()
})

test('Should create note', async () => {
  const note = new Note({
    user: userId,
    title,
    content
  })

  await note.save()

  const noteFromDb = await Note.findOne({ user: userId })
  expect(noteFromDb).not.toBeNull()
  expect(noteFromDb.title).toBe(title)
  expect(noteFromDb.content).toBe(content)
})

test('Should create note if no content', async () => {
  const note = new Note({
    user: userId,
    title,
    content: ''
  })

  await note.save()

  const noteFromDb = await Note.findOne({ user: userId })
  expect(noteFromDb).not.toBeNull()
  expect(noteFromDb.title).toBe(title)
  expect(noteFromDb.content).toBe('')
})

test('Should not create note if no user', async () => {
  const note = new Note({
    title,
    content
  })

  try {
    await note.save()
    throw new Error('Should not be able to create note if no user')
  } catch (error) {
    expect(error.message).toBe('note validation failed: user: Path `user` is required.')
  }
})
