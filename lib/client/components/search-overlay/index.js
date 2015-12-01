import React from 'react'
import Chrome from '../chrome'

export default function SearchOverlay ({onSearchChange}) {
  return (

    // TODO: Extract the Overlay component (?)
    <div className='Overlay Overlay-hidden'>
      <Chrome onSearchChange={onSearchChange} />
      <div className='SearchOverlayResults'>
      </div>
    </div>
  )
}
