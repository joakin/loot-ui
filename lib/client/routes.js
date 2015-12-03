import React from 'react'
import { Route } from 'react-router'

import App from './components/app'
import Article from './containers/article'

// UI routes (usable in server & client)
export default (
  <Route path='/' component={App}>
    <Route path='shell' component={null}/>
    <Route path='wiki/:title' component={Article} />
  </Route>
)
