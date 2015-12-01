import React from 'react'
import Search from '../search'

import './chrome.less'

export default function Chrome ({
  isSearchDisabled,
  onSearchClick,
  onSearchChange,
  searchFocus
}) {
  return (
    <div className='Chrome'>
      <div className='Chrome-content'>
        <Search disabled={isSearchDisabled} onClick={onSearchClick} onChange={onSearchChange} focus={searchFocus} />
      </div>
    </div>
  )
}
