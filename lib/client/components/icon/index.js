import React from 'react'

import './icon.less'

export default function (props) {
  return <div {...props} className={`Icon is-type-${props.type}`}/>
}

export const types = {
  MENU: 'menu',
  CLOSE: 'close',
  HOME: 'home'
}
