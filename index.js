require('babel-core/register')
require.extensions['.less'] = function () { return null }

global.__CLIENT__ = false
global.__SERVER__ = true

require('./lib/server/index')
