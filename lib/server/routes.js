import http from 'http'
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RoutingContext} from 'react-router'

import routes from '../routes'
import views from './views'
import api from '../api'

const router = express.Router()
export default router

router.get('*', (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(
        views.layout({
          title: (renderProps.params.title || '') + 'Wikipedia',
          body: renderToString(<RoutingContext {...renderProps} />)
        })
      )
    } else {
      res.status(404).send('Not found')
    }
  })
})

/*
router.get('/wiki/:title', (req, res) => {
  var title = req.params.title
  var escapedTitle = title.replace(/_/g, ' ')
  api.lead(title)
    .then((content) =>
      res.end(views.layout({
        title: escapedTitle,
        body: views.articleSummary({
          title: escapedTitle,
          body: content
        })
      })))
    .catch((e) => error(e.message, res))
})

router.get('/wiki/full/:title', (req, res) => {
  var title = req.params.title
  var escapedTitle = title.replace(/_/g, ' ')
  api.full(title)
    .then((content) =>
      res.end(views.layout({
        title: escapedTitle,
        body: views.article({
          title: escapedTitle,
          body: content
        })
      })))
    .catch((e) => error(e.message, res))
})
*/

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
