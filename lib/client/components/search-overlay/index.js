import React from 'react'
import Overlay, { OverlayContent } from '../overlay'
import Icon, {types} from '../icon'
import TopBar from '../top-bar'
import SearchInput from '../search-input'
import PageList from '../page-list'

export default function SearchOverlay ({
  onSearchChange, results, error, onResultClick, onCloseClick
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
        {!error
          ? <PageList items={results} onItemClick={onResultClick} />
          : renderError(error)}
      </OverlayContent>
    </Overlay>
  )
}

function renderError (err) {
  return (
    <div>
      <p>Oh snap!  There was a problem retreiving the results.</p>
      <p>Check your internet connection</p>
    </div>
  )
}
