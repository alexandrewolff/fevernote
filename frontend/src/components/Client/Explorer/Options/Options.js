import React, { useState } from 'react'

import './Options.scss'
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu'

const Options = ({ notesCount, setSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  let noteCountText = ''

  if (notesCount) {
    noteCountText = notesCount > 1
      ? `${notesCount} notes`
      : `${notesCount} note`
  }

  const clickHandler = () => {
    if (!showDropdown) setShowDropdown(true)
  }

  let dropdown = null

  if (showDropdown) {
    dropdown = (
      <DropdownMenu
        position={{ top: '29px', right: 'calc(-60% + 26px)' }}
        setShowDropdown={setShowDropdown}
      >

      </DropdownMenu>
    )
  }

  return (
    <div className="options">
      <h2 className="options__title">Every notes</h2>

      <div className="options__wrapper">
        <p className="options__notes-count">{noteCountText}</p>
        <button
          className="options__filter-btn"
          onClick={clickHandler}
        >
          <i className="fas fa-filter"></i>
        </button>

        {dropdown}
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
