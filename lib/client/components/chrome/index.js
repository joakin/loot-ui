import React from 'react'
import SearchInput from '../search-input'
import Icon, {types} from '../icon'
import TopBar from '../top-bar'

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
    <TopBar>
      {closeButton}
      <SearchInput disabled={isSearchDisabled} focus={searchFocus}
        onClick={onSearchClick}
        onChange={onSearchChange} />
    </TopBar>
  )
}
