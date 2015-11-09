import React from 'react'

export default ({ title, content }) => (
  <div className='Article'>
    <h1>{title}</h1>
    <div className='Article-content'
      dangerouslySetInnerHTML={{__html: content}} />
  </div>
)
