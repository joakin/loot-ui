import Express from 'express'
import ecstatic from 'ecstatic'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack/dev.webpack.config'

import router from './routes'

const server = Express()
const port = process.env.PORT || 7002

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  // server.use(webpackHotMiddleware(compiler))
}

server.use(ecstatic({
  root: './public',
  showDir: false
}))

server.use(router)

server.listen(port, () => console.log('Listening at', port))
