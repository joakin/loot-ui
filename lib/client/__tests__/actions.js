import assert from 'assert'
let {describe, it, afterEach} = global
import simpleMock, {mock} from 'simple-mock'
import {configureStore} from '../get-store'

import api from '../api'

/**
 * article actions
 */
import {
  ARTICLE_SUMMARY, ARTICLE_CONTENT, fetchSummary, fetchContent,
  getArticle, CHANGE_ARTICLE, changeArticle
} from '../actions'
import {articles} from '../reducers'
import * as articleDB from '../db/article'

describe('Article actions', () => {
  describe('#fetchSummary', () => {
    afterEach(() => simpleMock.restore())

    it('should start an api request to the lead endpoint', (done) => {
      mock(api, 'lead').returnWith(Promise.resolve('gotit'))
      fetchSummary('asdf')((action) => {
        assert.equal(action.type, ARTICLE_SUMMARY)
        assert.equal(action.title, 'asdf')
        assert.equal(action.doc, 'gotit')
      }).then(() => {
        assert.equal(api.lead.called, true, 'The api lead method was called')
        assert.equal(api.lead.callCount, 1)
        assert.equal(api.lead.lastCall.arg, 'asdf')
        done()
      }).catch(done)
    })
  })

  describe('#fetchContent', () => {
    afterEach(() => simpleMock.restore())

    it('should start an api request to the full endpoint', (done) => {
      mock(api, 'full').returnWith(Promise.resolve('gotit'))
      fetchContent('asdf')((action) => {
        assert.equal(action.type, ARTICLE_CONTENT)
        assert.equal(action.title, 'asdf')
        assert.equal(action.doc, 'gotit')
      }).then(() => {
        assert.equal(api.full.called, true, 'The api full method was called')
        assert.equal(api.full.callCount, 1)
        assert.equal(api.full.lastCall.arg, 'asdf')
        done()
      }).catch(done)
    })
  })

  describe('#getArticle', () => {
    afterEach(() => simpleMock.restore())

    const summaryAction = {
      type: ARTICLE_SUMMARY, title: 'asdf', doc: { sections: [] }
    }

    it('should return the article from memory if it is there', (done) => {
      const articleInMemory = articles(articles(undefined, {}), summaryAction)
      getArticle(summaryAction.title)(() => {}, () => ({ articles: articleInMemory }))
        .then((article) => {
          assert.deepEqual(article.doc, summaryAction.doc)
          done()
        })
        .catch(done)
    })

    it('should access the DB if the article is not in memory', (done) => {
      let articlesStore = articles(undefined, {})
      let fakeArticle = { doc: true }
      mock(articleDB, 'get').returnWith(Promise.resolve(fakeArticle))
      getArticle(summaryAction.title)(() => {}, () => ({ articles: articlesStore }))
        .then((article) => {
          assert.equal(articleDB.get.called, true)
          assert.equal(articleDB.get.callCount, 1)
          done()
        })
        .catch(done)
    })

    it('should return the article from DB if it not in memory', (done) => {
      let articlesStore = articles(undefined, {})
      let fakeArticle = { doc: true }
      const dispatch = (action) => {
        articlesStore = articles(articlesStore, action)
      }
      const getState = () => ({ articles: articlesStore })

      mock(articleDB, 'get').returnWith(Promise.resolve(fakeArticle))

      getArticle(summaryAction.title)(dispatch, getState).then((article) => {
        assert.deepEqual(article.doc, fakeArticle.doc)
        done()
      }).catch(done)
    })

    it('should return nothing if the article is not in memory or DB', (done) => {
      let articlesStore = articles(undefined, {})
      const dispatch = () => {}
      const getState = () => ({ articles: articlesStore })
      mock(articleDB, 'get').returnWith(Promise.resolve(undefined))
      getArticle(summaryAction.title)(dispatch, getState).then((article) => {
        assert.equal(article, undefined)
        done()
      }).catch(done)
    })
  })

  describe('#changeArticle', () => {
    afterEach(() => simpleMock.restore())

    it('should trigger a change article action', (done) => {
      let firstAction = true
      changeArticle('asdf')((action) => {
        if (firstAction) {
          assert.equal(action.type, CHANGE_ARTICLE)
          assert.equal(action.title, 'asdf')
          done()
          firstAction = false
        } else { return new Promise(() => {}) }
      })
    })

    it('should fetch summary when changing article if the article is not available in memory/db', (done) => {
      const testDoc = { sections: ['whatever'] }
      mock(api, 'lead').returnWith(Promise.resolve(testDoc))
      let store = configureStore()
      store.dispatch(changeArticle('asdf')).then(() => {
        assert.equal(api.lead.callCount, 1)
        assert.equal(api.lead.lastCall.arg, 'asdf')
        assert.deepEqual(store.getState().articles['asdf'].doc, testDoc)
        done()
      }).catch(done)
    })

    it('should fetch summary when changing article even if the article is available in memory/db to get fresh content', (done) => {
      const testDoc = { sections: ['whatever'] }
      const testDocUpdated = { sections: ['whatever', 'new'] }
      let store = configureStore({ articles: { asdf: { doc: testDoc } } })
      mock(api, 'lead').returnWith(Promise.resolve(testDocUpdated))
      store.dispatch(changeArticle('asdf')).then(() => {
        assert.equal(api.lead.callCount, 1)
        assert.equal(api.lead.lastCall.arg, 'asdf')
        assert.deepEqual(store.getState().articles['asdf'].doc, testDocUpdated)
        done()
      }).catch(done)
    })
  })
})

/**
 * search actions
 */
import {START_SEARCH_REQUEST, STOP_SEARCH_REQUEST, search} from '../actions'
describe('Search actions', () => {
  afterEach(() => simpleMock.restore())

  describe('#search', () => {
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
})

/**
 * toasts actions
 */
import {ADD_TOAST, REMOVE_TOAST, showToast} from '../actions'
describe('Toasts actions', () => {
  describe('#showToast', () => {
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
})
