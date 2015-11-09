import React from 'react'
import { Route } from 'react-router'

import App from './components/app'
import Article from './containers/article'
import ArticleSummary from './containers/article-summary'

// UI routes (usable in server & client)
export default (
  <Route path='/' component={App}>
    <Route path='wiki/:title' component={ArticleSummary} />
    <Route path='wiki/full/:title' component={Article} />
  </Route>
)
