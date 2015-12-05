import React from 'react'
import './overlay.less'

export default ({children, ...props}) => (
  <div {...props} className='Overlay'>{children}</div>
)
