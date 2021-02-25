import React, { Fragment, useState } from 'react'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Authentication = ({ login }) => {
  const [showSignupMenu, setShowSignupMenu] = useState(false)
  const [fields, setFields] = useState({
    email: {
      config: {
        tag: 'input',
        type: 'email',
        placeholder: 'Your email'
      },
      value: ''
    },
    password: {
      config: {
        tag: 'input',
        type: 'password',
        placeholder: 'Your password'
      },
      value: ''
    },
    passwordConfirmation: {
      config: {
        tag: 'input',
        type: 'password',
        placeholder: 'Confirm your password'
      },
      value: ''
    }
  })

  const switchMenuHandler = () => {
    setShowSignupMenu(prevIsSignup => !prevIsSignup)
  }

  const changeHandler = (event, field) => {
    const updatedFields = {
      ...fields
    }

    const updatedField = {
      ...updatedFields[field]
    }

    updatedField.value = event.target.value
    updatedFields[field] = updatedField

    setFields(updatedFields)
  }

  const fieldsElements = []
  for (const field in fields) {
    if (!showSignupMenu && field === 'passwordConfirmation') continue

    fieldsElements.push(
      <Input
        key={field}
        config={fields[field].config}
        value={fields[field].value}
        changeHandler={(event) => changeHandler(event, field)}
      />
    )
  }

  const formElements = (
    <form onSubmit={(event) => event.preventDefault()}>
      {fieldsElements}
      <Button>{showSignupMenu ? 'SIGNUP' : 'SIGNIN'}</Button>
    </form>
  )

  let menuElements = null

  if (showSignupMenu) {
    menuElements = (
      <div>
        {formElements}
        <p>Don't have an account?</p>
        <Button clickHandler={switchMenuHandler}>Create account</Button>
      </div>
    )
  } else {
    menuElements = (
      <div>
        {formElements}
        <p>Already have an account?</p>
        <Button clickHandler={switchMenuHandler}>Sign in</Button>
      </div>
    )
  }

  return (
    <Fragment>
      {menuElements}
      <Button>Try with guest account</Button>
    </Fragment>
  )
}

export default Authentication
