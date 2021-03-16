import React from 'react'

import { formatMongodbTimestamp } from '../../../helpers/helpers'
import TopMenu from './TopMenu/TopMenu'
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
      <TopMenu noteTimestamp={date} />
      {content}
    </div>
  )
}

export default Editor
