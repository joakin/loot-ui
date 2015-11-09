import http from 'http'
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RoutingContext} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from '../client/configureStore'

import routes from '../client/routes'
import views from './views'
import api from '../client/api'

const router = express.Router()
export default router

router.get('*', (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let store = configureStore()

      // Get the data fetching functions from the Routes components
      let promises = renderProps.routes
        .filter((route) => route.component && route.component.fetchData)
        // Run and get the promises
        .map((route) => route.component.fetchData(store, renderProps.params))

      // Wait for all data fetching to finish
      Promise.all(promises)
        .then(() => {
          const html = renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps}/>
            </Provider>
          )
          res.status(200).send(
            views.layout({
              title: (renderProps.params.title || '') + ' - Wikipedia',
              body: html,
              data: store.getState()
            })
          )
        })
        .catch((e) => res.status(500).send(e.message))
    } else {
      res.status(404).send('Not found')
    }
  })
})

router.all('/api/*', (req, res) => {
  var splat = req.params[0]
  if (splat == null) {
    error('noope', res)
  } else {
    http.get(api.url(splat), (apiRes) => apiRes.pipe(res))
      .on('error', (e) => error(e.message, res))
  }
})

function error (e, res) {
  res.statusCode = 500
  res.end(e)
}
