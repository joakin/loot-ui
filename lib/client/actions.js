import api from './api'

export const CHANGE_ARTICLE = 'CHANGE_ARTICLE'
export const ARTICLE_SUMMARY = 'ARTICLE_SUMMARY'
export const ARTICLE_CONTENT = 'ARTICLE_CONTENT'

function isDifferentArticle (getState, title) {
  return getState().selectedArticle !== title
}

export function changeArticle (title) {
  return (dispatch, getState) => {
    if (isDifferentArticle(getState, title)) {
      dispatch({ type: CHANGE_ARTICLE, title })
      return api.lead(title).then((summary) =>
        dispatch({ type: ARTICLE_SUMMARY, title, summary }))
    }
  }
}

export function changeFullArticle (title) {
  return (dispatch, getState) => {
    if (isDifferentArticle(getState, title)) {
      dispatch({ type: CHANGE_ARTICLE, title })
      return api.full(title).then((content) =>
        dispatch({ type: ARTICLE_CONTENT, title, content }))
    }
  }
}
