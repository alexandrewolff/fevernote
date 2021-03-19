import React from 'react'

import './Notes.scss'
import Note from './Note/Note'

const Notes = ({ notes, selectedNoteId, setSelectedNoteId }) => {
  let notesElements = null

  if (notes) {
    notesElements = notes.map((note, index) => (
      <Note
        key={note._id}
        selected={note._id === selectedNoteId}
        noteSelectionHandler={() => setSelectedNoteId(note._id)}
        note={note}
      />
    ))
  }

  return (
    <div className="notes">{notesElements}</div>
  )
}

export default Notes
