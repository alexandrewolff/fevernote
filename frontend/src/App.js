import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition'
import axios from 'axios'
import { toMilliseconds } from 'yaspar'

import './App.scss'
import Authentication from './components/Authentication/Authentication'
import Client from './components/Client/Client'
import Warning from './components/UI/overlay/Warning/Warning'
import Modal from './components/UI/overlay/Modal/Modal'
import Spinner from './components/UI/overlay/Spinner/Spinner'

const App = () => {
  const [token, setToken] = useState('')
  const [warning, setWarning] = useState({ show: false, content: '' })
  const [modal, setModal] = useState({ show: false, onValidation: null })
  const [showSpinner, setShowSpinner] = useState(false)
  const [timeoutRef, setTimeoutRef] = useState(null)

  useEffect(() => {
    const localStorageExpirationTime = parseInt(localStorage.getItem('expirationTime'))

    if (localStorageExpirationTime && localStorageExpirationTime > Date.now()) {
      const localStorageToken = localStorage.getItem('token')
      setToken(localStorageToken)

      setSessionTimeout(localStorageExpirationTime - Date.now())
    }
  }, [])

  const login = (token, expiration) => {
    const expirationTime = Date.now() + toMilliseconds(expiration)
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)
    setToken(token)

    setSessionTimeout(toMilliseconds(expiration))
  }

  const logout = async () => {
    try {
      setShowSpinner(true)

      await axios.post('/logout')

      clearTimeout(timeoutRef)
      setTimeoutRef(null)

      localStorage.removeItem('token')
      localStorage.removeItem('expirationTime')
      setToken('')

      setShowSpinner(false)
    } catch (error) {
      setShowSpinner(false)
      setWarning({ show: true, content: error.message })
    }
  }

  const verifyAccount = async (props) => {
    const token = props.match.params.token

    setShowSpinner(true)

    try {
      const response = await axios.get(`/verify/${token}`)

      setShowSpinner(false)
      setWarning({ show: true, content: `Your ${response.data.email} account has been verified. Enjoy!` })
    } catch (error) {
      setShowSpinner(false)

      if (error.response.data) {
        setWarning({ show: true, content: error.response.data })
      } else {
        setWarning({ show: true, content: error.message })
      }
    }
  }

  const setSessionTimeout = (delay) => {
    const reference = setTimeout(() => {
      logout()
      setWarning({ show: true, content: 'Your session has expired, please sign in again.' })
    }, delay)

    setTimeoutRef(reference)
  }

  let routes = null

  if (token) {
    routes = (
      <Switch>
        <Route path="/client" render={() => <Client
          logout={logout}
          token={token}
          setShowSpinner={setShowSpinner}
          setModal={setModal}
          setWarning={setWarning}
        />} />
        <Redirect to="/client" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/authentication" render={() => <Authentication
          login={login}
          setShowSpinner={setShowSpinner}
          setWarning={setWarning}
        />} />
        <Redirect to="/authentication" />
      </Switch>
    )
  }

  return (
    <div className="app">
      <Route path="/verify/:token" render={(props) => { verifyAccount(props) }} />

      {routes}

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={warning.show}
        timeout={300}
        classNames="overlay--visible"
      >
        <Warning
          close={() => setWarning({ ...warning, show: false })}
        >
          {warning.content}
        </Warning>
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={modal.show}
        timeout={300}
        classNames="overlay--visible"
      >
        <Modal
          onValidation={modal.onValidation}
          close={() => setModal({ ...modal, show: false })}
        />
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showSpinner}
        timeout={300}
        classNames="overlay--visible"
      >
        <Spinner />
      </CSSTransition>
    </div>
  )
}

export default App
