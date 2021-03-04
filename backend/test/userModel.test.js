const mongoose = require('mongoose')
const User = require('../src/models/userModel')

let email, password

beforeAll(async () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.set('useCreateIndex', true)

  await User.deleteMany()

  email = 'joe@gmail.com'
  password = 'asSDd8f7fasd@#$sdaf'
})

afterEach(async () => await User.deleteMany())

afterAll(() => {
  mongoose.connection.close()
})

test('Should create user', async () => {
  const user = new User({
    email,
    password
  })

  await user.save()
  const userFromDb = await User.findOne({ email })

  expect(userFromDb).not.toBeNull()
  expect(userFromDb.password).not.toBe(password)
})

test('Should NOT create user if missing required field', async () => {
  const user = new User({
    email: '',
    password
  })

  try {
    await user.save()
    return false
  } catch (err) {
    expect(err.message).toBe('user validation failed: email: Path `email` is required.')
  }
})

test('Should NOT create user if password doesn\'t match rules', async () => {
  const user = new User({
    email,
    password: 'NoSp3cialChar'
  })

  try {
    await user.save()
    return false
  } catch (error) {
    expect(error.message).toBe('user validation failed: password: Your password needs 8 characters, 1 lower character, 1 upper character, 1 special character and 1 number')
  }
})
