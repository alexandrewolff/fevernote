import React from 'react'

import './Notes.scss'
import Note from './Note/Note'

const Notes = ({ notes, selectedNote }) => {
  let notesElements = null

  if (notes) {
    notesElements = notes.map((note, index) => (
      <Note
        key={note._id}
        note={note}
      />
    ))
  }

  return (
    <div className="notes">{notesElements}</div>
  )
}

export default Notes
