import React from 'react'
import SearchInput from '../search-input'

import './top-bar.less'

export default ({onSearchClick, children}) => (
  <div className='TopBar'>
    <SearchInput disabled focus={false}
      onClick={onSearchClick} />
  </div>
)
