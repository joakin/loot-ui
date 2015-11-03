var fs = require('fs')
var ejs = require('ejs')

module.exports = {
  index: template('index')
}

function template (name) {
  var str = fs.readFileSync(`${__dirname}/views/${name}.ejs`).toString()
  return ejs.compile(str)
}

