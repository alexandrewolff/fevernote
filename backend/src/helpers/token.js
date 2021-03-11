const jwt = require('jsonwebtoken')

exports.generateToken = (id, expirationTime) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: expirationTime })
}

exports.decodeToken = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error(error)
  }
}
