import React from 'react'

import './Backdrop.scss'

const Backdrop = ({ clickHandler }) => {
  return (
    <div className="backdrop" onClick={clickHandler} />
  )
}

export default Backdrop
