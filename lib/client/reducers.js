import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import {
  CHANGE_ARTICLE, EXPAND_ARTICLE, ARTICLE_SUMMARY, ARTICLE_CONTENT,
  ARTICLE_FROM_DB, START_SEARCH_SESSION, START_SEARCH_REQUEST,
  STOP_SEARCH_REQUEST, STOP_SEARCH_SESSION, ADD_TOAST, REMOVE_TOAST,
  SHOW_MENU, HIDE_MENU
} from './actions'

function selectedArticle (state = null, action) {
  if (action.type === CHANGE_ARTICLE) return action.title
  return state
}

function articles (state = {}, action) {
  switch (action.type) {
    case EXPAND_ARTICLE:
    case ARTICLE_SUMMARY:
    case ARTICLE_CONTENT:
    case ARTICLE_FROM_DB:
      return {
        ...state,
        [action.title]: article(state[action.title], action)
      }
    default: return state
  }
}

export function article (state = {
  doc: null,
  full: false,
  expanded: false
}, action) {
  switch (action.type) {
    case EXPAND_ARTICLE: return { ...state, expanded: true }
    case ARTICLE_SUMMARY:
      // If we have the full article ignore the summary
      return state.doc && state.full
        ? state
        : { ...state, doc: action.doc }
    case ARTICLE_CONTENT:
      return { ...state, doc: action.doc, full: true }
    case ARTICLE_FROM_DB:
      return { ...state, ...action.article }
    default: return state
  }
}

export function search (state = {
  isSearching: false,
  q: '',
  results: []
}, action) {
  switch (action.type) {
    case START_SEARCH_SESSION:
      return {
        ...state,
        isSearching: true,
        q: '',
        results: []
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
          results: action.results
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

function toasts (state = [], action) {
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

export default combineReducers({
  articles,
  selectedArticle,
  search,
  toasts,
  menu,
  routing: routeReducer
})
