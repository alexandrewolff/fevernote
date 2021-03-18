import React, { useState } from 'react'

import './Explorer.scss'
import Options from './Options/Options'
import Notes from './Notes/Notes'

const Explorer = ({ notes, selectedNote, noteSelectionHandler }) => {
  const [search, setSearch] = useState('')

  const filteredNotes = notes.filter(note => note.title.includes(search) || note.content.includes(search))

  return (
    <div className="explorer">
      <Options
        notesCount={notes.length}
        setSearch={setSearch}
      />
      <Notes
        notes={filteredNotes}
        selectedNote={selectedNote}
        noteSelectionHandler={noteSelectionHandler}
      />
    </div>
  )
}

export default Explorer
