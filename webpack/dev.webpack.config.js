var webpack = require('webpack')
var conf = module.exports = require('./base.webpack.config')

conf.devtool = 'source-map'
// conf.entry = ['webpack-hot-middleware/client'].concat(conf.entry)
// conf.plugins = conf.plugins.concat(
//   new webpack.HotModuleReplacementPlugin()
// )
