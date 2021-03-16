import React from 'react'

import Note from './Note/Note'

const Notes = ({ notes, selectedNote }) => {
  let notesElements = null

  if (notes) {
    notesElements = notes.map((note, index) => (
      <Note
        key={note._id}
        // selected={index === selectedNote}
        note={note}
        // noteSelectionHandler={() => this.props.noteSelectionHandler(note._id)}
      />
    ))
  }

  return (
    <div>
      <div className="notes-list">{notesElements}</div>
    </div>
  )
}

export default Notes
