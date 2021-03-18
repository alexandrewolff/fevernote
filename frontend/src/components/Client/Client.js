import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './Client.scss'
import Explorer from './Explorer/Explorer'
import Editor from './Editor/Editor'

const MAX_TITLE_LENGTH = 80

const Client = ({
  logout,
  token,
  setShowSpinner,
  setModal,
  setWarning
}) => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(0)

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    updateNotes()
  }, [token])

  const updateNotes = async () => {
    try {
      setShowSpinner(true)

      const response = await axios.get(
        '/notes'
      )

      setNotes(response.data)
      setShowSpinner(false)
    } catch (error) {
      setShowSpinner(false)
      setWarning({ show: true, content: `Couldn't get your notes: ${error.message}` })
    }
  }

  const createNoteHandler = async () => {
    try {
      setShowSpinner(true)

      await axios.post(
        '/note',
        {
          title: '',
          content: ''
        }
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

  const saveNoteHandler = async () => {
    try {
      setShowSpinner(true)

      await axios.put(`/note/${notes[selectedNote]._id}`,
        {
          title: notes[selectedNote].title,
          content: notes[selectedNote].content
        }
      )

      setShowSpinner(false)
      setWarning({
        show: true,
        content: 'Your note has been saved!'
      })
      updateNotes()
    } catch (error) {
      setShowSpinner(false)

      setWarning({
        show: true,
        content: `Couldn't save your note: ${error.message}`
      })
    }
  }

  const deleteNoteHandler = async () => {
    try {
      setShowSpinner(true)

      await axios.delete(
        `/note/${notes[selectedNote]._id}`
      )

      setShowSpinner(false)
      updateNotes()
    } catch (error) {
      setShowSpinner(false)

      setWarning({
        modal: {
          show: true,
          content: `Couldn't delete your note: ${error.message}`
        }
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
        saveNoteHandler={saveNoteHandler}
        deleteNoteHandler={deleteNoteHandler}
        setModal={setModal}
        logout={logout}
      />
    </div>
  )
}

export default Client
