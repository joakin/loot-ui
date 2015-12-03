import React from 'react'

import './search.less'

export default function Search ({ disabled, onClick, onChange, focus }) {
  return (
    <input
      type='search'
      placeholder='Search Wikipedia'
      title='Search Wikipedia [f]'
      accessKey='f'
      className='Search'
      autoComplete='off'
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
      autoFocus={focus}
    />
  )
}
