import api from './api'

export const CHANGE_ARTICLE = 'CHANGE_ARTICLE'
export const ARTICLE_SUMMARY = 'ARTICLE_SUMMARY'
export const ARTICLE_CONTENT = 'ARTICLE_CONTENT'

export function changeArticle (title) {
  return (dispatch) => {
    dispatch({ type: CHANGE_ARTICLE, title })
    return api.lead(title).then((summary) =>
      dispatch({ type: ARTICLE_SUMMARY, title, summary }))
  }
}

export function changeFullArticle (title) {
  return (dispatch) => {
    dispatch({ type: CHANGE_ARTICLE, title })
    return api.full(title).then((content) =>
      dispatch({ type: ARTICLE_CONTENT, title, content }))
  }
}
