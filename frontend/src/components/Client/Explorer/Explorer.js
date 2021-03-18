import React from 'react'

import './Explorer.scss'
import Options from './Options/Options'
import Notes from './Notes/Notes'

const Explorer = ({ notes, selectedNote, noteSelectionHandler }) => {
  return (
    <div className="explorer">
      <Options notesCount={notes.length} />
      <Notes
        notes={notes}
        selectedNote={selectedNote}
        noteSelectionHandler={noteSelectionHandler}
      />
    </div>
  )
}

export default Explorer
