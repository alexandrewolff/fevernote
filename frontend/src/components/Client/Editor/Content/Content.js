import React from 'react'

import './Content.scss'

const Content = ({ note, titleInputHandler, contentInputHandler }) => {
  return (
    <div className="content">
      <h2>
        <input
          type="text"
          className="content__title"
          value={note.title}
          placeholder="Title"
          onChange={titleInputHandler}
        />
      </h2>
      <p className="content__paragraph">
        <textarea
          className="content__text"
          value={note.content}
          placeholder="Text"
          onChange={contentInputHandler}
        />
      </p>
    </div>
  )
}

export default Content
