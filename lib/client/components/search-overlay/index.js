import React from 'react'
import Overlay, { OverlayContent } from '../overlay'
import Icon, {types} from '../icon'
import TopBar from '../top-bar'
import SearchInput from '../search-input'
import PageList from '../page-list'
import LoadingPageList from '../loading-page-list'

export default function SearchOverlay ({
  onSearchChange, q, results, error, onResultClick, onCloseClick
}) {
  let content
  if (error) content = renderError(error)
  else if (!q) content = null
  else if (results) content = <PageList items={results} onItemClick={onResultClick} />
  else content = <LoadingPageList />
  return (
    <Overlay onClick={onCloseClick}>
      <TopBar>
        <Icon type={types.CLOSE} onClick={onCloseClick} />
        <SearchInput disabled={false} focus
          onClick={(e) => e.stopPropagation()}
          onChange={onSearchChange} />
      </TopBar>
      <OverlayContent>{content}</OverlayContent>
    </Overlay>
  )
}

function renderError (_) {
  return (
    <div>
      <p>Oh snap!  There was a problem retreiving the results.</p>
      <p>Check your internet connection</p>
    </div>
  )
}
