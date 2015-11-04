import React from 'react'
import { Router, Route } from 'react-router'

import App from './components/app'
import Article from './components/article'

// UI routes (usable in server & client)
export default (
  <Router>
    <Route path='/' component={App}>
      <Route path='wiki/:title' component={Article} />
    </Route>
  </Router>
)
