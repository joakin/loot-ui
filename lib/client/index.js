import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import Routes from './routes'
import configureStore from './configureStore'
import * as db from './db'
import * as offline from './offline'

// Initialize service worker if available
offline.init()

const initialState = window.__DATA__
const store = configureStore(initialState)
const history = createBrowserHistory()

// Initialize DB before any actions would trigger
db.init()
  .then(() => {
    // Sync the router and the stores
    syncReduxAndRouter(history, store)
    // Trigger initial render
    render(
      <Provider store={store}>
        <Router history={history}>
          {Routes}
        </Router>
      </Provider>,
      document.getElementById('content')
    )
  })
