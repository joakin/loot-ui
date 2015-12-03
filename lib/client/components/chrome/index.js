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
    <div className='Chrome' onClick={(e) => e.stopPropagation()}>
      <div className='Chrome-content'>
        {closeButton}
        <Search disabled={isSearchDisabled} focus={searchFocus}
          onClick={onSearchClick}
          onChange={onSearchChange} />
      </div>
    </div>
  )
}
