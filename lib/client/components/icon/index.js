import React from 'react'

import './icon.less'

export default function ({ type, className, ...attrs }) {
  return <div {...attrs} className={`Icon is-type-${type} ${className || ''}`}/>
}

export const types = {
  MENU: 'menu',
  CLOSE: 'close',
  HOME: 'home',
  HISTORY: 'history',
  ARROW: 'arrow'
}
