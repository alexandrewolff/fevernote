const mongoose = require('mongoose')
const { isEmail, isStrongPassword } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ACCOUNT_VALIDATION_EXPIRATION_TIME = '12h'
const LOGIN_EXPIRATION_TIME = '1h'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate (value) {
      if (!isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate (value) {
      if (!isStrongPassword(value)) {
        throw new Error('Your password needs 8 characters, 1 lower character, 1 upper character, 1 special character and 1 number')
      }
    }
  },
  tokens: [{
    type: String
  }]
}, {
  timestamps: true
})

userSchema.methods.toPublicObject = function () {
  const user = this

  delete user.password
  delete user.tokens

  return user
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
