import React from 'react'

import './Content.scss'

const Content = ({ note, titleInputHandler, contentInputHandler }) => {
  return (
    <div className="content">
      <h2 className="content__title">
        <input
          type="text"
          className="content__title-field"
          value={note.title}
          placeholder="Title"
          onChange={titleInputHandler}
        />
      </h2>
      <p className="content__text">
        <textarea
          className="content__text-field"
          value={note.content}
          placeholder="Text"
          onChange={contentInputHandler}
        />
      </p>
    </div>
  )
}

export default Content
