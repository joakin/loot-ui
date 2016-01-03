import React from 'react'
import Section from '../section'
import ReadMore from '../read-more-link'
import LazyImages from '../lazy-images'
import LastModifiedBar from '../../components/last-modified'
import FakeText from '../fake-text'

import './article.less'

export default function Article ({
  title, expanded, full, doc, error,
  onExpand, onRetry
}) {
  let loadingExpandedDoc = (expanded && !full)
  return (
    <article className='Article'>
      <h1 className='Article-title'>{title.replace(/_/g, ' ')}</h1>
      <div className='Article-content'>
        {error
          ? renderError(error, onRetry)
          : (!doc ? <FakeText />
              : <LazyImages>
                  {doc.sections.map(Section)}
                </LazyImages>)}
      </div>
      {loadingExpandedDoc
        ? <FakeText />
        : (full || error ? null
           : <ReadMore title={title} onExpand={onExpand}/>)}
      {!doc ? null
        : <LastModifiedBar title={title} editor={doc.lastmodified.by}
            timestamp={doc.lastmodified.at}/>}
    </article>
  )
}

function renderError (_, onRetry) {
  return (
    <div>
      <p>Oh snap!  There was a problem retreiving the page.</p>
      <p>Check your internet connection!</p>
      <p>
        <a onClick={(e) => { e.preventDefault(); onRetry() }} href=''>
          Try again?
        </a>
      </p>
    </div>
  )
}
