const User = require('../../src/models/userModel')

const createUser = (email, password) => {
  const user = new User({
    email,
    password
  })

  return user.save()
}

module.exports = {
  createUser
}
