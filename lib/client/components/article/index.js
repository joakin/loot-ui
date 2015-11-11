import React from 'react'
import './article.less'

function preventAll (e) {
  e.preventDefault()
  e.stopPropagation()
}

export default ({ title, expanded, summary, content, onExpand }) => (
  <div className='Article'>
    <h1>{title}</h1>
    <div className='Article-content'
      dangerouslySetInnerHTML={{
        __html: expanded ? content : summary
      }} />
    {expanded ? null
      : <div className='Article-readMore'>
          <a href={`/wiki/${title}?full`}
            onClick={(e) => { preventAll(e); onExpand() }}>
            Read more...
          </a>
        </div>}
  </div>
)
