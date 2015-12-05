import React from 'react'
import Search from '../search'

import './top-bar.less'

export default ({onSearchClick, children}) => (
  <div className='TopBar'>
    <Search disabled focus={false}
      onClick={onSearchClick} />
  </div>
)
