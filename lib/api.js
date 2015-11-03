var http = require('http')
var concat = require('concat-stream')

var url = (splat) => `http://localhost:7001/${splat}`

exports.raw = (splat) =>
  new Promise((resolve, reject) =>
    http.get(url(splat), (apiRes) => resolve(apiRes))
      .on('error', (e) => reject(e)))

exports.buffered = (splat) =>
  exports.raw(splat)
    .then((apiRes) =>
      new Promise((resolve, reject) => {
        var concatStream = concat((response) => resolve(response))
        apiRes.pipe(concatStream)
        apiRes.on('error', (e) => reject(e))
      }))

// FIXME: Update endpoint urls when loot supports them.
exports.lead = (title) => exports.buffered(`slim/${title}`)
exports.full = (title) => exports.buffered(`slim/${title}`)
