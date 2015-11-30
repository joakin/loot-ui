import React from 'react'
import Chrome from './../chrome'

import './index.less'

export default ({children}) => (
  <div className='App'>
    <Chrome />
    {children}
  </div>
)
