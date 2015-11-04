var fs = require('fs')
var ejs = require('ejs')

module.exports = {
  layout: template('layout')
}

function template (name) {
  var str = fs.readFileSync(`${__dirname}/${name}.ejs`).toString()
  return ejs.compile(str)
}

