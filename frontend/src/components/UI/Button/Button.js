import React from 'react'

import './Button.scss'

const Button = ({ children, clickHandler }) => {
  return (
      <button
        className="button button--animated"
        onClick={clickHandler}
      >
        {children}
      </button>
  )
}

export default Button
