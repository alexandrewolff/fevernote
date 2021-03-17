import React from 'react'

import './Explorer.scss'
import Options from './Options/Options'
import Notes from './Notes/Notes'

const Explorer = ({ notes, selectedNote }) => {
  return (
    <div className="explorer">
      <Options notesCount={notes.length} />
      <Notes notes={notes} selectedNote={selectedNote} />
    </div>
  )
}

export default Explorer
