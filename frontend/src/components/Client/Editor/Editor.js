import React from 'react'

import { formatMongodbTimestamp } from '../../../helpers/helpers'
import Menu from './Menu/Menu'
import Content from './Content/Content'

const Editor = ({ note, titleInputHandler, contentInputHandler }) => {
  let date = null
  let content = null

  if (note) {
    date = formatMongodbTimestamp(note.updatedAt)

    content = (
      <Content
        note={note}
        titleInputHandler={titleInputHandler}
        contentInputHandler={contentInputHandler}
      />
    )
  }

  return (
    <div className="note-display">
      <Menu noteTimestamp={date} />
      {content}
    </div>
  )
}

export default Editor
