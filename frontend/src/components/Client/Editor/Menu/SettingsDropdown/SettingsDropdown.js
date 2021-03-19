import React from 'react'

import './SettingsDropdown.scss'
import Button from '../../../../UI/Button/Button'
import useOutsideClick from '../../../../../hooks/useOutsideClick'

const SettingsDropdown = ({ setShowDropdown, logout }) => {
  const ref = useOutsideClick(() => {
    setShowDropdown(false)
  })

  return (
    <div
      className="settings-dropdown"
      ref={ref}
    >
      <p className="settings-dropdown__option">
        <Button
          danger
          clickHandler={logout}
        >Logout</Button>
      </p>
    </div>
  )
}

export default SettingsDropdown
