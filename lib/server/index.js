import Express from 'express'
import ecstatic from 'ecstatic'

import router from '../routes'

const server = Express()
const port = process.env.PORT || 7002

server.use(ecstatic({
  root: './public',
  showDir: false
}))

server.use(router)

server.listen(port, () => console.log('Listening at', port))

