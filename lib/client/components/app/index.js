import React from 'react'
import Search from '../../containers/search'

import './index.less'

export default ({children}) => (
  <div className='App'>
    <Search />
    {children}
  </div>
)
