import express from 'express'
import compression from 'compression'

import router from './routes'

const server = express()
const port = process.env.PORT || 7002

server.use(compression())

server.use(express.static('public'))

server.use(router)

server.listen(port, () => console.log('Listening at', port))
