var http = require('http')
var url = require('url')

var router = require('./lib/routes')
var port = process.env.PORT || 7002

http.createServer((req, res) => {
  // Route request to corresponding endpoint
  var path = url.parse(req.url).pathname
  var match = router.match(path)
  if (match) match.fn(req, res, match)
  else { res.statusCode = 404; res.end('nope') }
}).listen(port, () => console.log('Listening at', port))
