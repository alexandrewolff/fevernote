import React, { useState } from 'react'

import './Explorer.scss'
import Options from './Options/Options'
import Notes from './Notes/Notes'

const Explorer = ({ notes, selectedNote, setSelectedNote }) => {
  const [search, setSearch] = useState('')

  const lowerCaseSearch = search.toLowerCase()

  const filteredNotes = notes.filter(note => {
    const lowerCaseTitle = note.title.toLowerCase()
    const lowerCaseContent = note.content.toLowerCase()
    return lowerCaseTitle.includes(lowerCaseSearch) || lowerCaseContent.includes(lowerCaseSearch)
  })

  return (
    <div className="explorer">
      <Options
        notesCount={notes.length}
        setSearch={setSearch}
      />
      <Notes
        notes={filteredNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </div>
  )
}

export default Explorer
