import React from 'react'

import SettingsDropdown from './SettingsDropdown/SettingsDropdown'
import Button from '../../../UI/Button/Button'

const Menu = ({ noteTimestamp }) => {
  return (
    <div className="top-menu">
      <div className="top-menu__controls">
        <Button>New Note</Button>
        <Button>Save</Button>
        <Button danger>Delete</Button>
        <Button settings>
            <i className="fas fa-cog"></i>
        </Button>
        <SettingsDropdown />
      </div>

      <p className="top-menu__last-modification">{noteTimestamp}</p>
  </div>
  )
}

export default Menu
