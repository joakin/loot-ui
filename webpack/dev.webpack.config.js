var conf = module.exports = require('./base.webpack.config')

conf.devtool = 'inline-source-map'
// conf.entry = ['webpack-hot-middleware/client'].concat(conf.entry)
// conf.plugins = conf.plugins.concat(
//   new webpack.HotModuleReplacementPlugin()
// )
