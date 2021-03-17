import React from 'react'

import './Menu.scss'
import SettingsDropdown from './SettingsDropdown/SettingsDropdown'
import Button from '../../../UI/Button/Button'

const Menu = ({ noteTimestamp }) => {
  return (
    <div className="menu">
      <div className="menu__controls">
        <Button>New Note</Button>
        <Button>Save</Button>
        <Button danger>Delete</Button>
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
