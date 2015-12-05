import React from 'react'
import { Link } from 'react-router'
import Overlay from '../overlay'
import Icon, {types} from '../icon'
import TopBar from '../top-bar'
import SearchInput from '../search-input'

import './search-overlay.less'

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
      <ol className='SearchOverlayResults'>
      {
        // TODO: Extract the PageList component.
        results.map(({ title }) => {
          const href = `/wiki/${title}`
          return <li className='SearchOverlayResults-result' key={title}>
            <Link to={href} onClick={onResultClick}>
              <strong>{title}</strong>
            </Link>
            <Link to={href} onClick={onResultClick}
              className='SearchOverlayResults-result-cover-link'
              tabIndex='-1' aria-hidden />
          </li>
        })
      }
      </ol>
    </Overlay>
  )
}
