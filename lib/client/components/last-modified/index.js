import React from 'react'
import timeago from 'timeago'
import './last-modified.less'

const MOBILE_WP = 'https://en.m.wikipedia.org/wiki'

export default ({ editor, title, timestamp }) => {
  const isAnon = editor.isAnonymous
  const historyUrl = `${MOBILE_WP}/Special:History/${title}`
  const editorUrl = isAnon
    ? `${MOBILE_WP}/Special:Contributions/{$editorName}`
    : `${MOBILE_WP}/Special:UserProfile/{$editorName}`
  const editorLabel = isAnon ? 'an anonymous user' : editor.name
  const historyText = 'Last edited ' + timeago(new Date(timestamp))

  return (
    <div className='LastModified active'>
      <a href={historyUrl}>{historyText}</a> by <a href={editorUrl} className='username'>{editorLabel}</a>
    </div>
  )
}
