const User = require('../models/userModel')
const { decodeToken } = require('../helpers/token')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const { _id } = decodeToken(token)
    const user = await User.findOne({ _id, tokens: token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user

    next()
  } catch {
    res.status(401).send('Please authenticate')
  }
}

module.exports = auth
