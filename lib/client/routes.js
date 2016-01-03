import React from 'react'
import { Route } from 'react-router'

import App from './containers/app'
import Article from './containers/article'
import About from './components/about'
import History from './containers/history'

// UI routes (usable in server & client)
export default (
  <Route path='/' component={App}>
    <Route path='shell' component={null}/>
    <Route path='about' component={About} />
    <Route path='History' component={History} />
    <Route path='wiki/:title' component={Article} />
  </Route>
)
