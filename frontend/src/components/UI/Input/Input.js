import React, { Fragment } from 'react'

import './Input.scss'

const Input = ({ config, value, isValid, changeHandler }) => {
  let warningMessage = null
  if (!isValid && value) {
    warningMessage = <p className="input-box__warning">{config.warningMessage}</p>
  }

  let inputElement = null
  switch (config.tag) {
    case ('input'):
      inputElement = (
        <div className="input-box">
          <input
            className="input"
            type={config.type}
            placeholder={config.placeholder}
            value={value}
            onChange={changeHandler}
          />
          {warningMessage}
        </div>
      )
      break
    default:
      console.log('ERROR: Missing tag for input')
  }

  return (
    <Fragment>
      {inputElement}
    </Fragment>
  )
}

export default Input
