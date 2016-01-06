import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import isEqual from 'lodash.isequal'

import {
  CHANGE_ARTICLE, EXPAND_ARTICLE, ARTICLE_SUMMARY, ARTICLE_CONTENT,
  ARTICLE_FROM_DB, START_SEARCH_SESSION, START_SEARCH_REQUEST,
  STOP_SEARCH_REQUEST, STOP_SEARCH_SESSION, ADD_TOAST, REMOVE_TOAST,
  SHOW_MENU, HIDE_MENU, CACHED_PAGES, TOGGLE_SECTION
} from './actions'

export function selectedArticle (state = null, action) {
  if (action.type === CHANGE_ARTICLE) return action.title
  return state
}

export function articles (state = {}, action) {
  switch (action.type) {
    case EXPAND_ARTICLE:
    case ARTICLE_SUMMARY:
    case ARTICLE_CONTENT:
    case ARTICLE_FROM_DB:
    case TOGGLE_SECTION:
      return {
        ...state,
        [action.title]: article(state[action.title], action)
      }
    default: return state
  }
}

export function article (state = {
  doc: null,
  error: null,
  full: false,
  expanded: false
}, action) {
  switch (action.type) {
    case EXPAND_ARTICLE: return { ...state, expanded: true }
    case ARTICLE_SUMMARY:
      // If we have the full article ignore the summary
      if (state.doc && state.full) return state
      else {
        // If the emmited document has error and we have a doc, ignore it
        // or if the new document is the same as the current one
        return (action.error && state.doc) || isEqual(state.doc, action.doc)
          ? state
          // If there is no error, then save
          : { ...state, doc: action.doc, error: action.error }
      }
      break
    case ARTICLE_CONTENT:
      // If the emmited document has error and we have a doc, ignore it
      // or if the new document is the same as the current one
      return (action.error && state.doc) || isEqual(state.doc, action.doc)
        ? state
        // If there is no error, then save
        : { ...state, doc: action.doc, error: action.error, full: true }
    case ARTICLE_FROM_DB:
      return { ...state, ...action.article }
    case TOGGLE_SECTION:
      const section = state.doc.sections[action.index]
      return updateSection(state, action.index, {
        ...section,
        open: !section.open
      })
    default: return state
  }
}

function updateSection (article, index, newSection) {
  return {
    ...article,
    doc: {
      ...article.doc,
      sections: [
        ...article.doc.sections.slice(0, index),
        newSection,
        ...article.doc.sections.slice(index + 1)
      ]
    }
  }
}

export function search (state = {
  isSearching: false,
  q: '',
  results: null
}, action) {
  switch (action.type) {
    case START_SEARCH_SESSION:
      return {
        ...state,
        isSearching: true,
        q: '',
        results: null,
        error: null
      }

    case START_SEARCH_REQUEST:
      return {
        ...state,
        q: action.q
      }

    case STOP_SEARCH_REQUEST:
      if (action.q === state.q) {
        return {
          ...state,
          q: action.q,
          results: action.results,
          error: action.error
        }
      }

      return state

    case STOP_SEARCH_SESSION:
      return {
        ...state,
        isSearching: false
      }

    default:
      return state
  }
}

export function toasts (state = [], action) {
  switch (action.type) {
    case ADD_TOAST: return [...state, action.toast]
    case REMOVE_TOAST: return state.filter((toast) => toast !== action.toast)
    default: return state
  }
}

export function menu (state = { open: false }, action) {
  switch (action.type) {
    case SHOW_MENU: return { open: true }
    case HIDE_MENU: return { open: false }
    default: return state
  }
}

export function history (state = { session: [], all: [] }, action) {
  switch (action.type) {
    case CHANGE_ARTICLE:
      return action.title === state.session[state.session.length - 1]
        ? state
        : {
          ...state,
          session: state.session.concat(action.title)
        }
    case CACHED_PAGES:
      return {
        ...state,
        all: action.titles
      }
    default: return state
  }
}

export default combineReducers({
  articles,
  selectedArticle,
  search,
  toasts,
  menu,
  history,
  routing: routeReducer
})
