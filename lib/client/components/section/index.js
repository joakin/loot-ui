import React from 'react'
import FakeText from '../fake-text'
import './section.less'

export default function Section ({ title, content }, index) {
  return (
    <section key={`section-${index}-${title}`} className='Section'>
      {!title ? null
        : <h2 className='Section-title'>{title}</h2>}
      {!content
        ? <FakeText paragraphs={1}/>
        : <div className='Section-body'
        dangerouslySetInnerHTML={{ __html: content }} />}
    </section>
  )
}
