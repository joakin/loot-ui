import React from 'react'
import './fake-text.less'

export default ({ length, paragraphs }) => {
  const DEFAULT_LENGTH = 150
  const len = (length || DEFAULT_LENGTH)
  const size = () => len + Math.round(Math.random() * len / 2)
  const numParagraphs = paragraphs || (1 + Math.round(Math.random() * 5))
  return (
    <div className='FakeText'>
      {
        new Array(numParagraphs).fill(null).map((_, i) =>
          <p key={i}>
            <FakeTextSpan size={size()} index={i} />
          </p>
        )
      }
    </div>
  )
}

export function FakeTextSpan ({ size, index }) {
  return (
    <span
      className={`FakeTextSpan p${(index + 1) % 10}`}
      dangerouslySetInnerHTML={{
        __html: new Array(size).fill('&nbsp;').join('')
      }} />
  )
}
