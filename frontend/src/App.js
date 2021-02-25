import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Authentication from './containers/Authentication/Authentication'
import Client from './containers/Client/Client'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'))
    setIsAuthenticated(isAuthenticated)
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem('isAuthenticated', 'false')
  }

  let routes = (
    <Switch>
      <Route path="/authentication" render={() => <Authentication login={login} />} />
      <Redirect to="/authentication" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/client" render={() => <Client logout={logout} />} />
        <Redirect to="/client" />
      </Switch>
    )
  }

  return (
    <div>
      { routes }
    </div>
  )
}

export default App
