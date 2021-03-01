import React from 'react'

import './Spinner.scss'
import Backdrop from '../Backdrop/Backdrop'

const Spinner = () => (
    <div className="overlay">
      <Backdrop />
      <div className="loader"></div>
    </div>
)

export default Spinner
