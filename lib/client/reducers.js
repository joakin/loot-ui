import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import {
  CHANGE_ARTICLE, EXPAND_ARTICLE, ARTICLE_SUMMARY, ARTICLE_CONTENT
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
      return {
        ...state,
        [action.title]: article(state[action.title], action)
      }
    default: return state
  }
}

function article (state = {
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
    default: return state
  }
}

export default combineReducers({
  articles,
  selectedArticle,
  routing: routeReducer
})
