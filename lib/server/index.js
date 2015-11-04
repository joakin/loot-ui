var http = require('http')
var url = require('url')
var ecstatic = require('ecstatic')({
  root: './public',
  showDir: false
})

var router = require('../routes')
var port = process.env.PORT || 7002

http.createServer((req, res) => {
  // Route request to corresponding endpoint
  var path = url.parse(req.url).pathname
  var match = router.match(path)
  if (match) match.fn(req, res, match)
  else ecstatic(req, res)
}).listen(port, () => console.log('Listening at', port))
