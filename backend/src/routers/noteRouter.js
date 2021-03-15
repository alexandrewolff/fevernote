const { Router } = require('express')
const Note = require('../models/noteModel')
const auth = require('../middleware/auth')

const router = new Router()

router.post('/api/note', auth, async (req, res) => {
  const note = new Note({
    user: req.user._id,
    ...req.body
  })

  try {
    await note.save()
    res.status(201).send(note)
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = router
