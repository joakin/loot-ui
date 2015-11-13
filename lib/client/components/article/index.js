import React from 'react'

import Section from '../section'

function preventAll (e) {
  e.preventDefault()
  e.stopPropagation()
}

export default function Article ({ title, expanded, full, doc, onExpand }) {
  return (
    <article className='Article'>
      <h1>{title.replace(/_/g, ' ')}</h1>
      <div className='Article-content'>
        {doc ? doc.sections.map(Section) : 'Loading...'}
      </div>
      {!doc ? null
        : <ReadMore title={title} expanded={expanded} full={full}
            onExpand={onExpand}/>}
    </article>
  )
}

function ReadMore ({ title, expanded, full, onExpand }) {
  return (
    <div className='Article-readMore'>
      {expanded
        ? (full ? null : 'Loading...')
        : <a href={`/wiki/${title}?full`}
            onClick={(e) => { preventAll(e); onExpand() }}
            >Read more...</a>}
    </div>
  )
}
