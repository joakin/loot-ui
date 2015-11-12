import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

const loggerMiddleware = createLogger({ logger: console })

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
