function noOp () { return Promise.resolve() }

let storage = __CLIENT__
  ? require('localforage')
  : { getItem: noOp, setItem: noOp }

export default storage
