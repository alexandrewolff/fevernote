import React, { Fragment } from 'react'

const Input = ({ config, value, isValid, isTouched, changeHandler }) => {
  let errorMessage = null
  if (!isValid && isTouched) {
    errorMessage = <p>{config.errorMessage}</p>
  }

  let inputElement = null
  switch (config.tag) {
    case ('input'):
      inputElement = (
        <div>
          <input
            type={config.type}
            placeholder={config.placeholder}
            value={value}
            onChange={changeHandler}
          />
          {errorMessage}
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
