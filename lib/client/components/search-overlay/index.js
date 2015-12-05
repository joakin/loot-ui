import React from 'react'
import { Link } from 'react-router'
import Overlay from '../overlay'
import Chrome from '../chrome'

import './search-overlay.less'

export default function SearchOverlay ({
  onSearchChange, results, onResultClick, onCloseClick
}) {
  return (
    <Overlay onClick={onCloseClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <Chrome searchFocus showClose
          onSearchChange={onSearchChange}
          onCloseClick={onCloseClick} />
      </div>
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
