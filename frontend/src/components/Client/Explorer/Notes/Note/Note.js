import React from 'react'

const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    text = `${text.substring(0, maxLength)}...`
  }
  return text
}

const Note = ({ note }) => {
  const MAX_TITLE_LENGTH = 28
  const MAX_EXERPT_LENGHT = 88

  let { title } = note
  let exerpt = note.content

  title = trimText(title, MAX_TITLE_LENGTH)
  exerpt = trimText(exerpt, MAX_EXERPT_LENGHT)

  const date = new Date(note.updatedAt).toDateString()

  return (
    <div className="note-item">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__excerpt">{exerpt}</p>
      <p className="note-item__date">{date}</p>
    </div>
  )
}

export default Note
