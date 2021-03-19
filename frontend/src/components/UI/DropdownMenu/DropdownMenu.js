import React from 'react'

import './DropdownMenu.scss'
import useOutsideClick from '../../../hooks/useOutsideClick'

const DropdownMenu = ({ children, position, setShowDropdown }) => {
  const ref = useOutsideClick(() => {
    setShowDropdown(false)
  })

  let optionsElements = null

  if (children && children.length !== undefined) {
    optionsElements = children.map((option, index) => <li key={index} className="dropdown-menu__option">{option}</li>)
  } else {
    optionsElements = children
  }

  return (
    <div className="dropdown-menu" ref={ref} style={{ ...position }}>
      <ul className="dropdown-menu__list">
        {optionsElements}
      </ul>
    </div>
  )
}

export default DropdownMenu
