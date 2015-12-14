import React from 'react'
import './overlay.less'

export default (props) => {
  let {children} = props
  let attrs = { ...props, children: undefined }
  return <div {...attrs} className='Overlay'>{children}</div>
}

export const OverlayContent = (props) => {
  let {children} = props
  let attrs = { ...props, children: undefined }
  return <div {...attrs} className='OverlayContent'>{children}</div>
}
