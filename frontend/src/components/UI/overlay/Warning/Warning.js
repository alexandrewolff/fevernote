import React from 'react'

import '../overlay.scss'
import './Warning.scss'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../../Button/Button'

const Warning = ({ children, close }) => {
  return (
    <div className="overlay">
      <Backdrop clickHandler={close} />

      <div className="warning">
        <div className="warning__wrapper">

            <p className="warning__text">{children}</p>
            <Button clickHandler={close}>Okay!</Button>

        </div>
      </div>
    </div>
  )
}

export default Warning
