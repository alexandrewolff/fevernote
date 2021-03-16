import React from 'react'

import FilterDropdown from './FilterDropdown/FilterDropdown'

const Options = () => {
  return (
    <div>
      <h2 className="options__title">Every notes</h2>

      <div className="options__wrapper">
        <p className="options__notes-count"></p>
        <button className="options__filter-btn">
          <i className="fas fa-filter"></i>
        </button>
        <FilterDropdown />
      </div>

      <input className='options__search' type="text" placeholder="Search" />
    </div>
  )
}

export default Options
