import React from 'react'
import Overlay, { OverlayContent } from '../overlay'
import Icon, {types} from '../icon'
import TopBar from '../top-bar'
import SearchInput from '../search-input'
import PageList from '../page-list'

export default function SearchOverlay ({
  onSearchChange, results, onResultClick, onCloseClick
}) {
  return (
    <Overlay onClick={onCloseClick}>
      <TopBar>
        <Icon type={types.CLOSE} onClick={onCloseClick} />
        <SearchInput disabled={false} focus
          onClick={(e) => e.stopPropagation()}
          onChange={onSearchChange} />
      </TopBar>
      <OverlayContent>
        <PageList items={results} onItemClick={onResultClick} />
      </OverlayContent>
    </Overlay>
  )
}
