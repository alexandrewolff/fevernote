import React, { useState } from 'react'

import './Menu.scss'
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu'
import Button from '../../../UI/Button/Button'

const Menu = ({
  noteTimestamp,
  createNoteHandler,
  saveNoteHandler,
  deleteNoteHandler,
  setModal,
  logout
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  let lastModification = null
  if (noteTimestamp) {
    lastModification = (
      <p className="menu__last-modification">
        Last modification on {noteTimestamp}
      </p>
    )
  }

  const clickHandler = () => {
    if (!showDropdown) setShowDropdown(true)
  }

  let dropdown = null

  if (showDropdown) {
    dropdown = (
      <DropdownMenu
        position={{ right: '0', top: '44px' }}
        setShowDropdown={setShowDropdown}
      >
        <Button danger clickHandler={logout}>Logout</Button>
      </DropdownMenu>
    )
  }

  return (
    <div className="menu">
      <div className="menu__controls">
        <Button clickHandler={createNoteHandler}>New Note</Button>
        <Button clickHandler={saveNoteHandler}>Save</Button>
        <Button
          danger
          clickHandler={() => setModal({
            show: true,
            onValidation: deleteNoteHandler
          })}
        >Delete</Button>
        <Button
          settings
          clickHandler={clickHandler}
        >
            <i className="fas fa-cog menu__settings-icon"></i>
        </Button>

        {dropdown}
      </div>

      {lastModification}
  </div>
  )
}

export default Menu
