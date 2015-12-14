import React from 'react'

import './top-bar.less'

export default ({children, ...props}) => (
  <div {...props} className='TopBar'>{children}</div>
)
