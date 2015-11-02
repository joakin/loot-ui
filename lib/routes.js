var router = new (require('routes'))
var http = require('http')

router.addRoute('/wiki/:title', (req, res, match) => {
  res.end('Not implemented: ' + match.params.title)
})

router.addRoute('/wiki/full/:title', (req, res, match) => {
  res.end('Not implemented: ' + match.params.title)
})

router.addRoute('/api/*', (req, res, match) => {
  var splat = match.splats.length === 1 ? match.splats[0] : null
  if (splat == null) {
    res.statusCode = 500
    res.end('noope')
  } else {
    http.get(`http://localhost:7001/${splat}`, (apiRes) => apiRes.pipe(res))
      .on('error', (e) => error(e.message, res))
  }
})

function error (e, res) {
  res.statusCode = 500
  res.end(e)
}

module.exports = router
