import http from 'http'
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, Router, RoutingContext} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from '../client/configureStore'

import Routes from '../client/routes'
import views from './views'
import api from '../client/api'

const clientRouter = <Router>{Routes}</Router>
const router = express.Router()
export default router

router.all('/api/*', (req, res) => {
  var splat = req.params[0]
  if (splat == null) {
    error('noope', res)
  } else {
    http.get(api.url(splat), (apiRes) => { res.status(200); apiRes.pipe(res) })
      .on('error', (e) => error(e.message, res))
  }
})

router.get('*', (req, res, next) => {
  match({ routes: clientRouter, location: req.url }, (error, redirectLocation, renderProps) => {
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
        .map((route) => route.component.fetchData(store, renderProps))

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
        .catch((e) => {
          console.log(e.stack); res.status(500).send(e.message)
        })
    } else {
      res.status(404).send('Not found')
    }
  })
})

function error (e, res) {
  res.statusCode = 500
  res.end(e)
}
