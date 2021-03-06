import React from 'react'

import '../overlay.scss'
import './Spinner.scss'
import Backdrop from '../Backdrop/Backdrop'

const Spinner = () => (
    <div className="overlay">
      <Backdrop />
      <div className="spinner"></div>
    </div>
)

export default Spinner
