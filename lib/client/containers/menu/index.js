import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideMenu } from '../../actions'
import Icon, {types} from '../../components/icon'

import './menu.less'

const MenuContainer = ({ open, children }) => (
  <div className={`MenuContainer ${open ? 'is-open' : ''}`}>
    <Menu />
    <div className='MenuContainer-content'>
      {children}
    </div>
  </div>
)

const menuItems = [
  { label: 'Home', path: '/', icon: types.HOME }
]

export const Menu = () => (
  <nav className='Menu'>
    <ul className='Menu-list'>
      {menuItems.map(({ label, path, icon }) =>
        <li key={label}>
          <Link className='Menu-item' to={path}>
            <Icon type={icon} />
            {label}
          </Link>
        </li>
      )}
    </ul>
  </nav>
)

function selectState ({ menu }) { return { ...menu } }

function selectActions (dispatch) {
  return bindActionCreators({ hideMenu }, dispatch)
}

export default connect(selectState, selectActions)(MenuContainer)
