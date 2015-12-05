import React from 'react'
import Search from '../search'

import './app.less'

import Toasts from '../toasts'

export default ({children}) => (
  <div className='App'>
    <Search />
    <Toasts />
    <div className='App-content'>
      {children}
    </div>
  </div>
)
