import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startSearchSession } from '../../actions.js'
import Search from '../search'
import TopBar from '../../components/top-bar'
import Toasts from '../toasts'
import Icon, {types} from '../../components/icon'
import SearchInput from '../../components/search-input'

import './app.less'

const App = ({children, startSearchSession}) => (
  <div className='App'>
    <Search />
    <Toasts />

    <TopBar>
      <Icon type={types.MENU} onClick={() => console.log('menu')}/>
      <SearchInput disabled focus={false} onClick={startSearchSession} />
    </TopBar>
    <div className='App-content'>
      {children}
    </div>
  </div>
)

function selectState (s) { return s }
function selectActions (dispatch) {
  return bindActionCreators({ startSearchSession }, dispatch)
}

export default connect(selectState, selectActions)(App)
