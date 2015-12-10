import assert from 'assert'
let {describe, it, afterEach} = global
import simpleMock, {mock} from 'simple-mock'

/**
 * search actions
 */
import {START_SEARCH_REQUEST, STOP_SEARCH_REQUEST, search} from '../actions'
import api from '../api'
describe('Search actions', () => {
  afterEach(() => simpleMock.restore())

  it('should start a search request', (done) => {
    let actions = []
    mock(api, 'search').returnWith(Promise.resolve({ pages: [] }))
    search('asdf')((action) => actions.push(action)).then(() => {
      assert.equal(actions[0].type, START_SEARCH_REQUEST)
      assert.equal(actions[0].q, 'asdf')
      done()
    }).catch(done)
  })

  it('should call the search api with the query', () => {
    mock(api, 'search').returnWith(Promise.resolve())
    search('query')(() => {})
    assert.equal(api.search.called, true, 'the api search method was called')
    assert.equal(api.search.callCount, 1)
    assert.equal(api.search.lastCall.arg, 'query')
  })

  it('should stop the search request when successfully returning results from the api', (done) => {
    mock(api, 'search').returnWith(Promise.resolve({ pages: [1, 2, 3] }))
    search('query')((a) => a).then((lastAction) => {
      assert.equal(lastAction.type, STOP_SEARCH_REQUEST)
      assert.deepEqual(lastAction.results, [1, 2, 3])
      done()
    }).catch(done)
  })
})

/**
 * toasts actions
 */
import {ADD_TOAST, REMOVE_TOAST, showToast} from '../actions'
describe('Toasts actions', () => {
  it('should add a toast and remove it after the delay when triggering showToast action', (done) => {
    let actions = []
    const toastText = 'hi'
    showToast(toastText, 1)((action) => actions.push(action)).then(() => {
      assert.equal(actions.length, 2, 'It triggers two actions (add and remove)')
      assert.equal(actions[0].type, ADD_TOAST, 'It triggers an add toast action')
      assert.equal(actions[1].type, REMOVE_TOAST, 'It triggers a remove toast action')
      assert.equal(actions[0].toast.text, toastText, 'Add toast text is the one we passed to showToast')
      assert.equal(actions[1].toast.text, toastText, 'Remove toast text is the one we passed to showToast')
      done()
    }).catch((e) => done(e))
  })
})
