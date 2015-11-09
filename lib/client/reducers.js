import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import {
  CHANGE_ARTICLE, ARTICLE_SUMMARY, ARTICLE_CONTENT
} from './actions'

function selectedArticle (state = null, action) {
  switch (action.type) {
    case CHANGE_ARTICLE: return action.title
    default: return state
  }
}

function articles (state = {}, action) {
  switch (action.type) {
    case ARTICLE_SUMMARY:
      return {
        ...state,
        [action.title]: {
          ...(state[action.title] || {}),
          summary: action.summary
        }
      }
    case ARTICLE_CONTENT:
      return {
        ...state,
        [action.title]: {
          ...(state[action.title] || {}),
          content: action.content
        }
      }
    default: return state
  }
}

export default combineReducers({
  articles,
  selectedArticle,
  routing: routeReducer
})
