const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String
  }
}, {
  timestamps: true
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note
