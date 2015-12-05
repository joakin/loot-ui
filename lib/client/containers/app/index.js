import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startSearchSession } from '../../actions.js'
import Search from '../search'
import TopBar from '../../components/top-bar'
import Toasts from '../toasts'

import './app.less'

const App = ({children, startSearchSession}) => (
  <div className='App'>
    <Search />
    <Toasts />
    <TopBar onSearchClick={startSearchSession} />
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
