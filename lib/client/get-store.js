import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

const loggerMiddleware = createLogger({ logger: console })

let middlewares = [thunkMiddleware]
if (global.__CLIENT__) middlewares.push(loggerMiddleware)

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

let store = null

export function configureStore (initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}

export default function getStore (initialState) {
  if (store) return store
  store = configureStore(initialState)
  return store
}
