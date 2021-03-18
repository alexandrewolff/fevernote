import React from 'react'

import './Notes.scss'
import Note from './Note/Note'

const Notes = ({ notes, selectedNote, noteSelectionHandler }) => {
  let notesElements = null

  if (notes) {
    notesElements = notes.map((note, index) => (
      <Note
        key={note._id}
        selected={index === selectedNote}
        noteSelectionHandler={() => noteSelectionHandler(note._id)}
        note={note}
      />
    ))
  }

  return (
    <div className="notes">{notesElements}</div>
  )
}

export default Notes
