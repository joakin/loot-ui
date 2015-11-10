import React from 'react'
import {Link} from 'react-router'
import '../article/article.less'

export default ({ title, lead }) => (
  <div className='Article'>
    <h1>{title}</h1>
    <div className='Article-content'
      dangerouslySetInnerHTML={{__html: lead}} />
    <div className='Article-readMore'>
      <Link to={`/wiki/full/${title}`}>Read more...</Link>
    </div>
  </div>
)
