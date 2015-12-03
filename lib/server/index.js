import express from 'express'
import compression from 'compression'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack/dev.webpack.config'

import router from './routes'

const server = express()
const port = process.env.PORT || 7002

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  // server.use(webpackHotMiddleware(compiler))
}

server.use(compression())

server.use(express.static('public'))

server.use(router)

server.listen(port, () => console.log('Listening at', port))
