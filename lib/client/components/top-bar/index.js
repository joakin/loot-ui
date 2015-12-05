import React from 'react'
import Icon, {types} from '../icon'
import SearchInput from '../search-input'

import './top-bar.less'

export default ({onMenuClick, onSearchClick, children}) => (
  <div className='TopBar'>
    <Icon type={types.MENU} onClick={onMenuClick}/>
    <SearchInput disabled focus={false} onClick={onSearchClick} />
  </div>
)
