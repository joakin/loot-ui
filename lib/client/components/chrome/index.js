import React from 'react'
import Search from '../search'

import './chrome.less'

export default function Chrome ({
  isSearchDisabled,
  onSearchClick,
  onSearchChange
}) {
  return (
    <div className='Chrome'>
      <div className='Chrome-content'>
        <Search disabled={isSearchDisabled} onClick={onSearchClick} onChange={onSearchChange} />
      </div>
    </div>
  )
}
