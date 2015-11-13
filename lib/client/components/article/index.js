import React from 'react'
import './article.less'

function preventAll (e) {
  e.preventDefault()
  e.stopPropagation()
}

export default function article ({ title, expanded, full, doc, onExpand }) {
  let {sections} = doc
  return (
    <div className='Article'>
      <h1>{title.replace(/_/g, ' ')}</h1>
      <div className='Article-content'>
        {sections.map(section)}
      </div>
      {expanded
        ? (full ? null : 'Loading...')
        : <div className='Article-readMore'>
            <a href={`/wiki/${title}?full`}
              onClick={(e) => { preventAll(e); onExpand() }}>
              Read more...
            </a>
          </div>}
    </div>
  )
}

function section ({ title, content }, index) {
  return (
    <section key={`section-${index}-${title}`} className='Section'>
      <h2>{title}</h2>
      <div className='Section-body'
        dangerouslySetInnerHTML={{
          __html: content
        }} />
    </section>
  )
}
