import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

const loggerMiddleware = createLogger({ logger: console })

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

let store = null

function configureStore (initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}

export default function getStore (initialState) {
  if (store) return store
  store = configureStore(initialState)
  return store
}
