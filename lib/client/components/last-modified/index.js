import React from 'react'
import timeago from 'timeago'
import './last-modified.less'

export default React.createClass({
  propTypes: {
    editor: React.PropTypes.object,
    title: React.PropTypes.string,
    timestamp: React.PropTypes.string
  },
  render: function () {
    const isAnon = this.props.editor.isAnonymous
    const historyUrl = `https://en.m.wikipedia.org/wiki/Special:History/${this.props.title}`
    const editorUrl = isAnon ? `https://en.m.wikipedia.org/wiki/Special:Contributions/{$editorName}`
        : `https://en.m.wikipedia.org/wiki/Special:UserProfile/{$editorName}`
    const editorLabel = isAnon ? 'an anonymous user' : this.props.editor.name
    const historyText = 'Last edited ' + timeago(new Date(this.props.timestamp))

    return (
      <div className='LastModified active'>
        <a href={historyUrl}>{historyText}</a> by <a href={editorUrl} className='username'>{editorLabel}</a>
      </div>
    )
  }
})
