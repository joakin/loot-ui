function noOp () { return Promise.resolve() }

let storage = global.__CLIENT__
  ? require('localforage')
  : { getItem: noOp, setItem: noOp }

export default storage
