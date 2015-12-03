import React from 'react'
import Search from '../../containers/search'

import './index.less'

import Toasts from '../../containers/toasts'

export default ({children}) => (
  <div className='App'>
    <Search />
    <Toasts />
    {children}
  </div>
)
