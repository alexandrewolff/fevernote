import React, { Fragment, useState } from 'react'
import axios from 'axios'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Authentication = ({ login, reportError }) => {
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

    const updatedFields = {
      ...fields
    }

    for (const field in updatedFields) {
      const updatedField = {
        ...updatedFields[field]
      }

      updatedField.value = ''
      updatedFields[field] = updatedField
    }

    setFields(updatedFields)
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

  const submitHandler = async (event) => {
    event.preventDefault()

    const endpoint = showSignupMenu ? 'user' : 'login'

    const payload = {
      email: fields.email.value,
      password: fields.password.value
    }

    try {
      const response = await axios.post(endpoint, payload)
      login(response.token)
    } catch (err) {
      reportError(err)
    }
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

  let menuSwitch = null

  if (showSignupMenu) {
    menuSwitch = (
      <Fragment>
        <p>Don't have an account?</p>
        <p><a onClick={switchMenuHandler}>Create account</a></p>
      </Fragment>
    )
  } else {
    menuSwitch = (
      <Fragment>
        <p>Already have an account?</p>
        <p><a onClick={switchMenuHandler}>Sign in</a></p>
      </Fragment>
    )
  }

  return (
    <div>
      <form onSubmit={(event) => submitHandler(event)}>
        {fieldsElements}
        <Button>{showSignupMenu ? 'SIGNUP' : 'SIGNIN'}</Button>
      </form>

      {menuSwitch}
      <p>or</p>
      <p><a onClick={() => {}}>Try with a guest account!</a></p>
    </div>
  )
}

export default Authentication
