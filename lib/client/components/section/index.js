import React from 'react'
import FakeText from '../fake-text'
import Icon, {types} from '../icon'
import './section.less'

export default function Section ({ title, content, open, loading, onHeadingClick }, index) {
  const showContent = open || !title
  return (
    <section className={`Section ${showContent ? 'is-open' : ''}`}>
      {!title ? null
        : <h2 className='Section-title' onClick={() => onHeadingClick()}>
            <Icon type={types.ARROW} className='Section-toggle-icon'/>
            {title}
          </h2>}
      {!content
        ? (showContent && loading ? <FakeText paragraphs={1}/> : null)
        : <div className='Section-body'
            dangerouslySetInnerHTML={{ __html: content }} />}
    </section>
  )
}
