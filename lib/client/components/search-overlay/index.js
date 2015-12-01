import React from 'react'
import Chrome from '../chrome'

import './search-overlay.less'

export default function SearchOverlay ({onSearchChange, results}) {
  return (

    // TODO: Extract the Overlay component (?)
    <div className='Overlay'>
      <Chrome onSearchChange={onSearchChange} />
      <ol className='SearchOverlayResults'>
      {results.map((result) => {
        return <li className='SearchOverlayResults-result'>
          <strong>{result.title}</strong>
        </li>
      })}
      </ol>
    </div>
  )
}
