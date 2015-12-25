import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startSearchSession, showMenu } from '../../actions.js'
import Search from '../search'
import TopBar from '../../components/top-bar'
import Toasts from '../toasts'
import Icon, {types} from '../../components/icon'
import SearchInput from '../../components/search-input'
import Menu from '../menu'

import './app.less'

const App = ({menu, children, startSearchSession, showMenu}) => (
    <div className={`App ${menu.open ? 'is-menu-open' : ''}`}>
      <Menu />

      <div className='App-viewport'>
        <Toasts />
        <Search />

        <TopBar>
          <Icon type={types.MENU} onClick={showMenu}/>
          <SearchInput disabled focus={false} onClick={startSearchSession} />
        </TopBar>
        <div className='App-content'>
          {children}
        </div>
      </div>
    </div>
)

function selectState ({ menu }) { return { menu } }
function selectActions (dispatch) {
  return bindActionCreators({ startSearchSession, showMenu }, dispatch)
}

export default connect(selectState, selectActions)(App)
