import React from 'react'

import './Warning.scss'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'

const Warning = ({ children, closeWarning }) => {
  return (
    <div className="overlay">
      <Backdrop clickHandler={closeWarning} />

      <div className="warning-box">
        <div className="warning-box__wrapper">

            <p className="warning-box__text">{children}</p>

            <Button clickHandler={closeWarning}>Okay!</Button>

        </div>
      </div>
    </div>
  )
}

export default Warning
