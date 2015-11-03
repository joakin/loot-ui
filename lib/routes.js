var router = new (require('routes'))
var views = require('./views')
var api = require('./api')

router.addRoute('/wiki/:title', (req, res, match) => {
  var title = match.params.title
  var escapedTitle = title.replace(/_/g, ' ')
  api.lead(title)
    .then((content) =>
      res.end(views.index({
        title: escapedTitle,
        body: views.article({
          title: escapedTitle,
          body: content
        })
      })))
    .catch((e) => error(e.message, res))
})

router.addRoute('/wiki/full/:title', (req, res, match) => {
  res.end(views.index({
    title: match.params.title,
    body: 'Full ' + match.params.title
  }))
})

router.addRoute('/api/*', (req, res, match) => {
  var splat = match.splats.length === 1 ? match.splats[0] : null
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

module.exports = router
