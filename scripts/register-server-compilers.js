require('babel-core/register')
require.extensions['.less'] = function () { return null }
var fs = require('fs')

var packageConfig = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

global.__VERSION__ = packageConfig.version
global.__CLIENT__ = false
global.__SERVER__ = true

var jsdom = require('jsdom')

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = {userAgent: 'node.js'}
