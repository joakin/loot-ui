var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './lib/client/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(gif|png|jpg)$/, loader: 'url?limit=25000' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less') }
    ]
  }
}
