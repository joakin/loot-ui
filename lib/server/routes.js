import http from 'http'
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, Router, RoutingContext} from 'react-router'
import {Provider} from 'react-redux'
import {configureStore} from '../client/get-store'

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
    http.get(api.url(req.url.replace('/api/', '')), (apiRes) => {
      res.writeHead(apiRes.statusCode, apiRes.headers)
      apiRes.pipe(res)
    }).on('error', (e) => error(e.message, res))
  }
})

// Runs a request through the client side app. Will run the callback done when
// it has fetched the data.
function routeWebApp (url, res, done) {
  match({ routes: clientRouter, location: url }, (error, redirectLocation, renderProps) => {
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
        .then(() => done(renderProps, store))
        .catch((e) => {
          console.log(e.stack); res.status(500).send(e.message)
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}

router.all('/data/*', (req, res) => {
  var splat = req.params[0]
  if (splat == null) {
    error('noope', res)
  } else {
    var url = req.url.replace(/^\/data\//, '')
    routeWebApp(url, res, (renderProps, store) =>
      res.status(200).send(views.data({
        data: JSON.stringify(store.getState())
      })))
  }
})

router.get('*', (req, res) => {
  routeWebApp(req.url, res, (renderProps, store) => {
    const html = renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps}/>
      </Provider>
    )
    const state = JSON.stringify(store.getState())
    res.status(200).send(
      views.layout({
        title: (renderProps.params.title || '') + ' - Wikipedia',
        body: html,
        url: req.url,
        // Send inline data when it is smaller than 30kb. Else let the browser
        // request it with a script tag
        data: state.length < 30 * 1024 ? state : undefined
      })
    )
  })
})

function error (e, res) {
  res.statusCode = 500
  res.end(e)
}
