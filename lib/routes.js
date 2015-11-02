var router = new (require('routes'))

router.addRoute('/wiki/:title', (req, res, match) => {
  res.end('Not implemented: ' + match.params.title)
})

router.addRoute('/wiki/full/:title', (req, res, match) => {
  res.end('Not implemented: ' + match.params.title)
})

module.exports = router
