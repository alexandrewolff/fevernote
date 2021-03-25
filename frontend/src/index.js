import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import './minireset.css'
import './index.scss'
import App from './App'

axios.defaults.baseURL = 'https://wolff-fevernote.herokuapp.com/api'
axios.defaults.timeout = 20000

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
