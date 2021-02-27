import React, { Fragment, useState } from 'react'
import axios from 'axios'
import validator from 'validator'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Authentication = ({ login, reportError }) => {
  const [showSignupMenu, setShowSignupMenu] = useState(false)
  const [fields, setFields] = useState({
    email: {
      config: {
        tag: 'input',
        type: 'email',
        placeholder: 'Your email',
        errorMessage: 'The format of the email you entered is not valid'
      },
      isValid: false,
      isTouched: false,
      value: ''
    },
    password: {
      config: {
        tag: 'input',
        type: 'password',
        placeholder: 'Your password',
        errorMessage: 'Your password should at least be 8 characters long, and have 1 lower character, 1 upper character, 1 special character and 1 number'
      },
      isValid: false,
      isTouched: false,
      value: ''
    },
    passwordConfirmation: {
      config: {
        tag: 'input',
        type: 'password',
        placeholder: 'Confirm your password',
        errorMessage: 'Your password confirmation doesn\'t match'
      },
      isValid: false,
      isTouched: false,
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
      updatedField.isValid = false
      updatedField.isTouched = false
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
    updatedField.isValid = checkValidity(updatedField.value, field)
    updatedField.isTouched = true
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

  const checkValidity = (value, type) => {
    switch (type) {
      case ('email'):
        return validator.isEmail(value)
      case ('password'):
        return validator.isStrongPassword(value)
      case ('passwordConfirmation'):
        return value === fields.password.value
      default:
        return true
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
        isValid={fields[field].isValid}
        isTouched={fields[field].isTouched}
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
