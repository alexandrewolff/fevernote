import React, { useState } from 'react'

import './Explorer.scss'
import Options from './Options/Options'
import Notes from './Notes/Notes'

const Explorer = ({ notes, selectedNoteId, setSelectedNoteId }) => {
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
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
    </div>
  )
}

export default Explorer
