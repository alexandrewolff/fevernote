import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './Client.scss'
import Explorer from './Explorer/Explorer'
import Editor from './Editor/Editor'

const MAX_TITLE_LENGTH = 80

const Client = ({ logout, token, setShowSpinner, setWarning }) => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(0)

  useEffect(() => {
    updateNotes()
  }, [])

  const updateNotes = async () => {
    setShowSpinner(true)

    try {
      const response = await axios.get(
        '/notes',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setNotes(response.data)
      setShowSpinner(false)
    } catch (error) {
      setShowSpinner(false)
      setWarning({ show: true, content: `Couldn't get your notes: ${error.message}` })
    }
  }

  const createNoteHandler = async () => {
    setShowSpinner(true)

    try {
      await axios.post(
        '/note',
        {
          title: '',
          content: ''
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setShowSpinner(false)
      updateNotes()
    } catch (error) {
      setShowSpinner(false)
      setWarning({
        show: true,
        content: `Couldn't create a new note: ${error.message}`
      })
    }
  }

  const titleInputHandler = (event) => {
    if (event.target.value.length <= MAX_TITLE_LENGTH) {
      const updatedNotes = [...notes]
      updatedNotes[selectedNote].title = event.target.value
      setNotes(updatedNotes)
    }
  }

  const contentInputHandler = (event) => {
    const updatedNotes = [...notes]
    updatedNotes[selectedNote].content = event.target.value
    setNotes(updatedNotes)
  }

  return (
    <div className="client">
      <Explorer notes={notes} selectedNote={selectedNote} />
      <Editor
        note={notes[selectedNote]}
        titleInputHandler={titleInputHandler}
        contentInputHandler={contentInputHandler}
        createNoteHandler={createNoteHandler}
      />
    </div>
  )
}

export default Client
