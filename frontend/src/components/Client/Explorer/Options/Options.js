import React from 'react'

import './Options.scss'

const Options = ({ notesCount, setSearch }) => {
  let noteCountText = ''

  if (notesCount) {
    noteCountText = notesCount > 1
      ? `${notesCount} notes`
      : `${notesCount} note`
  }

  return (
    <div className="options">
      <h2 className="options__title">Every notes</h2>

      <div className="options__wrapper">
        <p className="options__notes-count">{noteCountText}</p>
      </div>

      <input
        className='options__search'
        type="text"
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />

    </div>
  )
}

export default Options
