import React, { Fragment } from 'react'

const Input = ({ config, value, changeHandler }) => {
  let inputElement = null

  switch (config.tag) {
    case ('input'):
      inputElement = <input
        type={config.type}
        placeholder={config.placeholder}
        value={value}
        onChange={changeHandler}
      />
      break
    default:
      console.error('Missing tag for input')
  }

  return (
    <Fragment>
      { inputElement }
    </Fragment>
  )
}

export default Input
