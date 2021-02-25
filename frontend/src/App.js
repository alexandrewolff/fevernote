import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Authentication from './components/Authentication/Authentication'
import Client from './components/Client/Client'

const App = () => {
  const [token, setToken] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem('token'))
    setToken(localStorageToken)

    if (error) {
      console.error('ERROR: ', error)
    }
  }, [token, error])

  const login = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  const reportError = (err) => {
    setError(err)
  }

  let routes = null

  if (token) {
    routes = (
      <Switch>
        <Route path="/client" render={() => <Client logout={logout} reportError={reportError} />} />
        <Redirect to="/client" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/authentication" render={() => <Authentication login={login} reportError={reportError} />} />
        <Redirect to="/authentication" />
      </Switch>
    )
  }

  return (
    <div>
      {routes}
    </div>
  )
}

export default App
