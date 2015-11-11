import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import {
  CHANGE_ARTICLE, EXPAND_ARTICLE, ARTICLE_SUMMARY, ARTICLE_CONTENT
} from './actions'

function selectedArticle (state = null, action) {
  if (action.type === CHANGE_ARTICLE) return action.title
  return state
}

function extendEntry (store, key, changes) {
  return {
    ...store,
    [key]: {
      ...(store[key] || {}),
      ...changes
    }
  }
}

function articles (state = {}, action) {
  switch (action.type) {
    case EXPAND_ARTICLE:
      return extendEntry(state, action.title, { expanded: true })
    case ARTICLE_SUMMARY:
      return extendEntry(state, action.title, { summary: action.summary })
    case ARTICLE_CONTENT:
      return extendEntry(state, action.title, { content: action.content })
    default: return state
  }
}

export default combineReducers({
  articles,
  selectedArticle,
  routing: routeReducer
})
