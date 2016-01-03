import React from 'react'
import './fake-text.less'

export default ({ length, paragraphs }) => {
  const DEFAULT_LENGTH = 150
  const size = () => (length || DEFAULT_LENGTH) + Math.round(Math.random() * (length || DEFAULT_LENGTH)/2)
  const numParagraphs = paragraphs || (1 + Math.round(Math.random() * 5))
  return (
    <div className='FakeText'>
      {
        new Array(numParagraphs).fill(null).map((_, i) =>
          <p>
            <span
              className={`p${(i+1)%10}`}
              dangerouslySetInnerHTML={{
                __html: new Array(size()).fill('&nbsp;').join('')
              }} />
          </p>
        )
      }
    </div>
  )
}
