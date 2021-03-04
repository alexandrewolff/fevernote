import React, { Fragment, useState } from 'react'
import axios from 'axios'
import validator from 'validator'

import './Authentication.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Authentication = ({ login, setShowSpinner, setWarning }) => {
  const [showSignupMenu, setShowSignupMenu] = useState(false)
  const [fields, setFields] = useState({
    email: {
      config: {
        tag: 'input',
        type: 'email',
        placeholder: 'Your email',
        warningMessage: 'The format of the email you entered is not valid'
      },
      isValid: false,
      value: ''
    },
    password: {
      config: {
        tag: 'input',
        type: 'password',
        placeholder: 'Your password',
        warningMessage: 'Your password needs 8 characters, 1 lower character, 1 upper character, 1 special character and 1 number'
      },
      isValid: false,
      value: ''
    },
    passwordConfirmation: {
      config: {
        tag: 'input',
        type: 'password',
        placeholder: 'Confirm your password',
        warningMessage: 'Your password confirmation doesn\'t match'
      },
      isValid: false,
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
    updatedFields[field] = updatedField

    setFields(updatedFields)
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const payload = {
      email: fields.email.value,
      password: fields.password.value
    }

    if (!payload.email || !payload.password) {
      return setWarning({ show: true, content: 'Please fill in all fields' })
    }

    setShowSpinner(true)

    const endpoint = showSignupMenu ? 'user' : 'login'

    try {
      const response = await axios.post(endpoint, payload)

      setShowSpinner(false)

      if (showSignupMenu) {
        setWarning({ show: true, content: 'Your account has been created. Please validate it with the mail you\'ve been sent! (It may take a few minutes to arrive)' })
      } else {
        login(response.token)
      }
    } catch (err) {
      setShowSpinner(false)
      setWarning({ show: true, content: String(err) })
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
        changeHandler={(event) => changeHandler(event, field)}
      />
    )
  }

  let menuSwitch = null
  if (showSignupMenu) {
    menuSwitch = (
      <Fragment>
        <p>Already have an account?</p>
        <p><a className="menu-switch__link" onClick={switchMenuHandler}>Sign in</a></p>
      </Fragment>
    )
  } else {
    menuSwitch = (
      <Fragment>
        <p>Don't have an account?</p>
        <p><a className="menu-switch__link" onClick={switchMenuHandler}>Create account</a></p>
      </Fragment>
    )
  }

  return (
    <div className="authentication">
      <div className="authentication-box">
        <div className="header">
          <h1 className="header__logo">Fever</h1>
        </div>

        <h2 className="title">{showSignupMenu ? 'Sign up' : 'Sign in'}</h2>

        <form className="form" onSubmit={(event) => submitHandler(event)}>
          {fieldsElements}
          <Button animated>Ready?</Button>
        </form>

        <div className="menu-switch">
          {menuSwitch}

          <p>or</p>
          <p><a className="menu-switch__link" onClick={() => {}}>Try with a guest account!</a></p>
        </div>
      </div>
    </div>
  )
}

export default Authentication
