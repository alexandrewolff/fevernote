import React from 'react'

import './Options.scss'
import FilterDropdown from './FilterDropdown/FilterDropdown'

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
        <button className="options__filter-btn">
          <i className="fas fa-filter"></i>
        </button>
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
