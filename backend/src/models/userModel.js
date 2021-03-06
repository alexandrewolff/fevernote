const mongoose = require('mongoose')
const { isEmail, isStrongPassword } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../helpers/token')
const { sendSignupEmail } = require('../emails/account')

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
  isVerified: {
    type: Boolean,
    default: false
  },
  tokens: [{
    type: String
  }]
}, {
  timestamps: true
})

userSchema.methods.toPublicObject = function () {
  const { _id, email, createdAt, updatedAt, __v } = this

  const updatedUser = {
    _id,
    email,
    createdAt,
    updatedAt,
    __v
  }

  return updatedUser
}

userSchema.methods.launchAccountValidation = function (appUrl) {
  const { email, _id } = this
  const validationToken = generateToken(_id, ACCOUNT_VALIDATION_EXPIRATION_TIME)
  sendSignupEmail({ email, host: appUrl, token: validationToken })
}

userSchema.methods.validateAccount = async function () {
  const user = this
  await User.updateOne({ _id: user._id }, { isVerified: true })
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

userSchema.methods.populateAuthToken = async function () {
  const { _id } = this
  const user = this

  const token = generateToken(_id, LOGIN_EXPIRATION_TIME)

  user.tokens.push(token)
  user.save()
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
