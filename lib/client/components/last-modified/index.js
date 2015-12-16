import React from 'react'
import timeago from 'timeago'
import './last-modified.less'

export default ({ editor, title, timestamp }) => {
  const isAnon = editor.isAnonymous
  const historyUrl = `https://en.m.wikipedia.org/wiki/Special:History/${title}`
  const editorUrl = isAnon
    ? `https://en.m.wikipedia.org/wiki/Special:Contributions/{$editorName}`
    : `https://en.m.wikipedia.org/wiki/Special:UserProfile/{$editorName}`
  const editorLabel = isAnon ? 'an anonymous user' : editor.name
  const historyText = 'Last edited ' + timeago(new Date(timestamp))

  return (
    <div className='LastModified active'>
      <a href={historyUrl}>{historyText}</a> by <a href={editorUrl} className='username'>{editorLabel}</a>
    </div>
  )
}
