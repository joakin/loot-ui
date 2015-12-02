import React from 'react'
import Chrome from '../chrome'

import './search-overlay.less'

export default function SearchOverlay ({onSearchChange, results}) {
  return (

    // TODO: Extract the Overlay component.
    <div className='Overlay'>
      <Chrome onSearchChange={onSearchChange} searchFocus />
      <ol className='SearchOverlayResults'>
      {
        // TODO: Extract the PageList component.
        results.map((result) => {
          const href = '/wiki/' + result.title

          return <li className='SearchOverlayResults-result' key={result.title}>
            <a href={href}>
              <strong>{result.title}</strong>
            </a>
            <a href={href} className='SearchOverlayResults-result-cover-link' tabIndex='-1' aria-hidden></a>
          </li>
        })
      }
      </ol>
    </div>
  )
}
