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

router.get('/api/notes', auth, async (req, res) => {
  try {
    await req.user.populate({
      path: 'notes',
      options: {
        sort: {
          updatedAt: -1
        }
      }
    }).execPopulate()

    res.send(req.user.notes)
  } catch {
    res.status(500).send()
  }
})

router.put('/api/note/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'content']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send('Invalid updates')
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })

    if (!note) {
      return res.status(404).send()
    }

    updates.forEach(update => { note[update] = req.body[update] })
    await note.save()

    res.status(200).send(note)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/api/note/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!note) {
      res.status(404).send()
    }

    res.status(200).send(note)
  } catch {
    res.status(500).send()
  }
})

module.exports = router
