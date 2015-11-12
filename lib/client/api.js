var fetch = require('isomorphic-fetch')

let prefix = '/api/'
if (__SERVER__) {
  prefix = 'http://localhost:7001/'
}

var url = exports.url = (splat) => `${prefix}${splat}`

exports.raw = (splat) =>
  fetch(url(splat))
    .then((resp) => {
      if (resp.status >= 400) {
        throw new Error('Bad response from server')
      }
      return resp.text()
    })

exports.lead = (title) => exports.raw(`slim/lead/${title}`)
exports.full = (title) => exports.raw(`slim/${title}`)
