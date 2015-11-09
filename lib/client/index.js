import './index.less'

import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import Routes from './routes'
import configureStore from './configureStore'

const initialState = window.__DATA__
const store = configureStore(initialState)
const history = createBrowserHistory()

syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>,
  document.getElementById('content')
)
