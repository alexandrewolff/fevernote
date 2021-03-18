import React from 'react'

import '../overlay.scss'
import './Modal.scss'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../../Button/Button'

const Modal = ({ onValidation, close }) => {
  const clickHandler = () => {
    close()
    onValidation()
  }

  return (
    <div className="overlay">
      <Backdrop clickHandler={close} />

      <div className="modal">
        <div className="modal__wrapper">

            <p className="modal__text">Are you sure?</p>
            <div className="modal__controls">
              <Button clickHandler={clickHandler}>Yes</Button>
              <Button danger clickHandler={close}>Wait...</Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
