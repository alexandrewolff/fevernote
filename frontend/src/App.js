import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition'
import axios from 'axios'
import { toMilliseconds } from 'yaspar'

import './App.scss'
import Authentication from './components/Authentication/Authentication'
import Client from './components/Client/Client'
import Spinner from './components/UI/overlay/Spinner/Spinner'
import Warning from './components/UI/overlay/Warning/Warning'

const App = () => {
  const [token, setToken] = useState('')
  const [warning, setWarning] = useState({ show: false, content: '' })
  const [showModal, setShowModal] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

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

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    setToken('')
  }

  const verifyAccount = async (props) => {
    const token = props.match.params.token

    setShowSpinner(true)

    try {
      const response = await axios.get(`/verify/${token}`, { timeout: 8000 })

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
    setTimeout(() => {
      logout()
      setWarning({ show: true, content: 'Your session has expired, please sign in again.' })
    }, delay)
  }

  let routes = null

  if (token) {
    routes = (
      <Switch>
        <Route path="/client" render={() => <Client
          logout={logout}
          setShowSpinner={setShowSpinner}
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
        in={showSpinner}
        timeout={300}
        classNames="overlay--visible"
      >
        <Spinner />
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={warning.show}
        timeout={300}
        classNames="overlay--visible"
      >
        <Warning
          closeWarning={() => setWarning({ ...warning, show: false })}
        >
          {warning.content}
        </Warning>
      </CSSTransition>
    </div>
  )
}

export default App
