import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition'

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
    const localStorageToken = JSON.parse(localStorage.getItem('token'))
    setToken(localStorageToken)
  }, [token])

  const login = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
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
