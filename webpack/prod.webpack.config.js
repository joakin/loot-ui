var webpack = require('webpack')
var conf = module.exports = require('./base.webpack.config')

conf.plugins = conf.plugins.concat(
  new webpack.optimize.UglifyJsPlugin()
)
