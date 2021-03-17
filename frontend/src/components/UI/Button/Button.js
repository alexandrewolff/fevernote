import React from 'react'

import './Button.scss'

const Button = ({ children, clickHandler, animated, danger, settings }) => {
  const classes = ['button']

  if (animated) {
    classes.push('button--animated')
  }

  if (danger) {
    classes.push('button--danger')
  }

  if (settings) {
    classes.push('button--settings')
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
