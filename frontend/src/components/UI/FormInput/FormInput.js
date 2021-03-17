import React, { Fragment } from 'react'

import './FormInput.scss'

const FormInput = ({ config, value, isValid, changeHandler }) => {
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
            className="input-box__field"
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

export default FormInput
