import React from 'react'
import './overlay.less'

export default ({children, ...props}) => (
  <div {...props} className='Overlay'>{children}</div>
)

export const OverlayContent = ({children, ...props}) => (
  <div {...props} className='OverlayContent'>{children}</div>
)
