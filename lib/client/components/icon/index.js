import React from 'react'

import './icon.less'

export default function ({ type, ...attrs }) {
  return <div {...attrs} className={`Icon is-type-${type}`}/>
}

export const types = {
  MENU: 'menu',
  CLOSE: 'close',
  HOME: 'home',
  HISTORY: 'history'
}
