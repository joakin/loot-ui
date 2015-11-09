import http from 'http'
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RoutingContext} from 'react-router'

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
      // Get the data fetching functions from the Routes components
      let promises = renderProps.routes
        .filter((route) => route.component && route.component.fetchData)
        // Run and get the promises
        .map((route) => route.component.fetchData(renderProps))

      // Wait for all data fetching to finish
      Promise.all(promises)
        .then((ds) => {
          // Merge data into one object
          // Each fetchData should return a vector of [key, response]
          var data = ds.reduce((a, [k, v]) => { a[k] = v; return a }, {})
          // Which will be passed into the component in props.params.data for
          // now until we incorporate redux stores
          renderProps.params.data = data
          res.status(200).send(
            views.layout({
              title: (renderProps.params.title || '') + ' - Wikipedia',
              body: renderToString(
                <RoutingContext {...renderProps}/>
              )
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
