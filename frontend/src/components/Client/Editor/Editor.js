import React from 'react'

import './Editor.scss'
import Menu from './Menu/Menu'
import Content from './Content/Content'

import { formatMongodbTimestamp } from '../../../helpers/helpers'

const Editor = ({
  note,
  titleInputHandler,
  contentInputHandler,
  createNoteHandler,
  saveNoteHandler,
  deleteNoteHandler,
  setModal,
  logout
}) => {
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
    <div className="editor">
      <Menu
        noteTimestamp={date}
        createNoteHandler={createNoteHandler}
        saveNoteHandler={saveNoteHandler}
        deleteNoteHandler={deleteNoteHandler}
        setModal={setModal}
        logout={logout}
      />
      {content}
    </div>
  )
}

export default Editor
