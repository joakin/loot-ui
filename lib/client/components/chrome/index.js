import React from 'react'
import Search from '../search'

import './chrome.less'

export default function Chrome ({
  isSearchDisabled,
  onSearchClick,
  onSearchChange,
  searchFocus,
  showClose,
  onCloseClick
}) {
  const closeButton = showClose
    ? <button className='Chrome-close' onClick={onCloseClick} />
    : null

  return (
    <div className='Chrome'>
      <div className='Chrome-content'>
        {closeButton}
        <Search disabled={isSearchDisabled} onClick={onSearchClick} onChange={onSearchChange} focus={searchFocus} />
      </div>
    </div>
  )
}
