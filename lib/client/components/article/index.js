import React from 'react'
import './article.less'

import Section from '../section'
import ReadMore from '../read-more-link'

export default function Article ({ title, expanded, full, doc, onExpand }) {
  let loadingExpandedDoc = (expanded && !full)
  return (
    <article className='Article'>
      <h1 className='Article-title'>{title.replace(/_/g, ' ')}</h1>
      <div className='Article-content'>
        {!doc ? 'Loading...' : doc.sections.map(Section)}
      </div>
      <ReadMore title={title} loading={loadingExpandedDoc}
        onExpand={onExpand}/>
    </article>
  )
}
