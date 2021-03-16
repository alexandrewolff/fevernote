import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Explorer from './Explorer/Explorer'
import Editor from './Editor/Editor'

const Client = ({ logout, token, setShowSpinner, setWarning }) => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(0)

  useEffect(() => {
    updateNoteList()
  }, [])

  const updateNoteList = async () => {
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

  return (
    <div>
      <Explorer notes={notes} selectedNote={selectedNote} />
      <Editor note={notes[selectedNote]} />
    </div>
  )
}

export default Client
