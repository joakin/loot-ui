import React from 'react'

import './top-bar.less'

export default (props) => {
  let {children} = props
  let attrs = {...props, children: undefined}
  return <div {...attrs} className='TopBar'>{children}</div>
}
