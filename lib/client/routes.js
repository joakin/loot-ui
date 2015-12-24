import React from 'react'
import { Route } from 'react-router'

import App from './containers/app'
import Article from './containers/article'
import About from './components/about'
import Random from './components/random'

// UI routes (usable in server & client)
export default (
  <Route path='/' component={App}>
    <Route path='shell' component={null}/>
    <Route path='wiki/:title' component={Article} />
    <Route path='random' component={Random} />
    <Route path='about' component={About} />
  </Route>
)
