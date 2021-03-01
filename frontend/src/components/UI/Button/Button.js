import React from 'react'

import './Button.scss'

const Button = ({ children, clickHandler, animated }) => {
  const classes = ['button']
  if (animated) {
    classes.push('button--animated')
  }

  return (
      <button
        className={classes.join(' ')}
        onClick={clickHandler}
      >
        {children}
      </button>
  )
}

export default Button
