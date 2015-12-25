import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideMenu } from '../../actions'
import Icon, {types} from '../../components/icon'

import './menu.less'

const menuItems = [
  { label: 'Home', path: '/', icon: types.HOME }
]

const MenuContainer = ({ open, hideMenu, children }) => (
  <div className={`MenuContainer ${open ? 'is-open' : ''}`}>
    <Menu items={menuItems} onItemClick={hideMenu}/>
    <div className='MenuContainer-content'>
      <div className='MenuContainer-content-overlay' onClick={hideMenu}/>
      {children}
    </div>
  </div>
)

export const Menu = ({items, onItemClick}) => (
  <nav className='Menu'>
    <ul className='Menu-list'>
      {items.map(({ label, path, icon }) =>
        <li key={label}>
          <Link className='Menu-item' to={path} onClick={onItemClick}>
            <Icon type={icon} />
            {label}
          </Link>
        </li>
      )}
    </ul>
    <ul className='Menu-footer-list'>
      <li><Link to='about' onClick={onItemClick}>About</Link></li>
      <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:About'>About Wikipedia</a></li>
      <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:General_disclaimer'>Disclaimers</a></li>
    </ul>
  </nav>
)

function selectState ({ menu }) { return { ...menu } }

function selectActions (dispatch) {
  return bindActionCreators({ hideMenu }, dispatch)
}

export default connect(selectState, selectActions)(MenuContainer)
