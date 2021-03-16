import React from 'react'

const Content = ({ note, titleInputHandler, contentInputHandler }) => {
  return (
    <div className="note">
      <h2>
        <input
          type="text"
          className="note__title"
          value={note.title}
          placeholder="Title"
          onChange={titleInputHandler}
        />
      </h2>
      <p className="note__paragraph">
        <textarea
          className="note__content"
          value={note.content}
          placeholder="Text"
          onChange={contentInputHandler}
        />
      </p>
    </div>
  )
}

export default Content
