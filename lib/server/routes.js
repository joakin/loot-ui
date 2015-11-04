import express from 'express'
import views from './views'
import api from '../api'

const router = express.Router()
export default router

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

router.all('/api/*', (req, res) => {
  var splat = req.params[0]
  if (splat == null) {
    error('noope', res)
  } else {
    api.raw(splat)
      .then((apiRes) => apiRes.pipe(res))
      .catch((e) => error(e.message, res))
  }
})

function error (e, res) {
  res.statusCode = 500
  res.end(e)
}
