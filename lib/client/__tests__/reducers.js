import assert from 'assert'
let {describe, it} = global

/**
 * selectedArticle reducer
 */
import {selectedArticle} from '../reducers'
import {CHANGE_ARTICLE} from '../actions'
describe('Selected article', () => {
  const initialSelectedArticle = selectedArticle(undefined, {})
  const changeArticleAction = { type: CHANGE_ARTICLE, title: 'asdf' }
  it('should initialize with no selected article', () =>
    assert.equal(initialSelectedArticle, null, 'There is no selected article'))

  it('should save the selected article when receiving a change article action', () =>
    assert.equal(
      selectedArticle(initialSelectedArticle, changeArticleAction),
      'asdf'
    ))
})

/**
 * search reducer
 */
import {search} from '../reducers'
import {
  startSearchSession, startSearchRequest, stopSearchRequest, stopSearchSession
} from '../actions'
describe('Search', () => {
  const initialSearch = () => search(undefined, {})
  const startSearch = (store, q) => search(store, startSearchRequest(q))

  it('should not be searching when initialized', () =>
    assert.equal(initialSearch().isSearching, false))

  it('should not have a query when initialized', () =>
    assert.equal(initialSearch().q, ''))

  it('should not have results when initialized', () =>
    assert.deepEqual(initialSearch().results, []))

  it('should set isSearching when starting a search session', () =>
    assert.equal(search(initialSearch(), startSearchSession()).isSearching, true))

  it('should set the query when starting a search request', () =>
    assert.equal(startSearch(initialSearch(), 'search').q, 'search'))

  it('should set the results when stopping a search request if the query matches', () => {
    const stoppedSearch = search(startSearch(initialSearch(), 'asdf'), stopSearchRequest('asdf', [1, 2, 3]))
    assert.equal(stoppedSearch.q, 'asdf')
    assert.deepEqual(stoppedSearch.results, [1, 2, 3])
  })

  it('should not set the results if the current query has changed', () => {
    const twoSearches = startSearch(startSearch(initialSearch(), 'asdf'), 'query2')
    assert.equal(twoSearches.q, 'query2')
    const firstResultsCame = search(twoSearches, stopSearchRequest('asdf', [1, 2, 3]))
    assert.deepEqual(firstResultsCame.results, [])
  })

  it('should not override results with stale requests that finish late', () => {
    // We search with two queries
    const twoSearches = startSearch(startSearch(initialSearch(), 'asdf'), 'query2')
    assert.equal(twoSearches.q, 'query2')
    // Results for the last query come back
    const secondResultsCame = search(twoSearches, stopSearchRequest('query2', [1, 2, 3]))
    assert.deepEqual(secondResultsCame.results, [1, 2, 3])
    // Results for the first query come back
    const lateFirstResultsCame = search(secondResultsCame, stopSearchRequest('asdf', [true]))
    assert.equal(twoSearches.q, 'query2')
    assert.deepEqual(lateFirstResultsCame.results, [1, 2, 3], 'Results from first query are discarded')
  })

  it('should not be searching when stopping the search session', () => {
    const stoppedSearch = search(startSearch(initialSearch(), 'asdf'), stopSearchSession())
    assert.equal(stoppedSearch.isSearching, false)
  })

  it('should reset query and results when starting a new search session', () => {
    const searched = search(startSearch(initialSearch(), 'asdf'), stopSearchRequest('asdf', [1, 2, 3]))
    const restartedSession = search(searched, startSearchSession())
    assert.equal(restartedSession.q, '')
    assert.deepEqual(restartedSession.results, [])
  })
})

/**
 * toasts reducer
 */
import {toasts} from '../reducers'
import {addToast, removeToast} from '../actions'

describe('Toasts', () => {
  const initialToasts = () => toasts(undefined, {})
  const toast = { text: 'hi' }

  it('should initialize without any toasts', () =>
     assert.equal(initialToasts().length, 0))

  it('should store a toast when getting an add toast action', () => {
    let newToasts = toasts(initialToasts(), addToast(toast))
    assert.equal(newToasts.indexOf(toast), 0)
  })

  it('should remove a toast from the store when getting a remove action', () => {
    let newToasts = toasts(toasts(initialToasts(), addToast(toast)), removeToast(toast))
    assert.equal(newToasts.indexOf(toast), -1)
  })
})

/**
 * menu reducer
*/
import {menu} from '../reducers'
import {showMenu, hideMenu} from '../actions'
describe('Menu reducer', () => {
  const initialMenu = () => menu(undefined, {})
  it('should initialize as closed', () =>
     assert.equal(initialMenu().open, false))

  it('should open when receiving a show menu action', () =>
     assert.equal(menu(initialMenu(), showMenu()).open, true))

  it('should remain open when receiving a show menu action while being open', () =>
     assert.equal(menu(menu(initialMenu(), showMenu()), showMenu()).open, true))

  it('should close when receiving a hide menu action while being open', () =>
     assert.equal(menu(menu(initialMenu(), showMenu()), hideMenu()).open, false))

  it('should stay closed when receiving a hide menu action while being closed', () =>
     assert.equal(menu(initialMenu(), hideMenu()).open, false))
})
