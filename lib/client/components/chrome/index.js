import React from 'react'
import SearchInput from '../search-input'
import Icon, {types} from '../icon'

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
    ? <Icon type={types.CLOSE} onClick={onCloseClick} />
    : null

  return (
    <div className='Chrome' onClick={(e) => e.stopPropagation()}>
      <div className='Chrome-content'>
        {closeButton}
        <SearchInput disabled={isSearchDisabled} focus={searchFocus}
          onClick={onSearchClick}
          onChange={onSearchChange} />
      </div>
    </div>
  )
}
