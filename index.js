require('babel-core/register')

global.__CLIENT__ = false
global.__SERVER__ = true

require('./lib/server/index')
