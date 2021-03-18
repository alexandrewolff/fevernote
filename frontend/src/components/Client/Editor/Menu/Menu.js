import React from 'react'

import './Menu.scss'
import SettingsDropdown from './SettingsDropdown/SettingsDropdown'
import Button from '../../../UI/Button/Button'

const Menu = ({
  noteTimestamp,
  createNoteHandler,
  saveNoteHandler,
  deleteNoteHandler,
  setModal,
  logout
}) => {
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
        <Button settings>
            <i className="fas fa-cog menu__settings-icon"></i>
        </Button>
        <SettingsDropdown />
      </div>

      <p className="menu__last-modification">Last modification on {noteTimestamp}</p>
  </div>
  )
}

export default Menu
