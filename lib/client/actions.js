import api from './api'

export const CHANGE_ARTICLE = 'CHANGE_ARTICLE'
export const ARTICLE_SUMMARY = 'ARTICLE_SUMMARY'
export const ARTICLE_CONTENT = 'ARTICLE_CONTENT'

function articleInMemory (getState, key, title) {
  let article = getState().articles[title]
  return article && article[key]
}

export function changeArticle (title) {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_ARTICLE, title })
    if (!articleInMemory(getState, 'summary', title)) {
      return api.lead(title).then((summary) =>
        dispatch({ type: ARTICLE_SUMMARY, title, summary }))
    }
  }
}

export function changeFullArticle (title) {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_ARTICLE, title })
    if (!articleInMemory(getState, 'content', title)) {
      return api.full(title).then((content) =>
        dispatch({ type: ARTICLE_CONTENT, title, content }))
    }
  }
}
