import React from 'react'
import PageList from '../page-list'
import {FakeTextSpan} from '../fake-text'

import './loading-page-list.less'

export default ({ length }) => {
  const items = new Array(length || 3).fill(null).map((_, i) => ({
    title: <FakeTextSpan index={i} size={15 + Math.round(20 * Math.random())} />,
    onlyText: true
  }))
  return (
    <div className='LoadingPageList'>
      <PageList items={items}
        onItemClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }} />
    </div>
  )
}
