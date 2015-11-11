import api from './api'

export const CHANGE_ARTICLE = 'CHANGE_ARTICLE'
export const ARTICLE_SUMMARY = 'ARTICLE_SUMMARY'
export const ARTICLE_CONTENT = 'ARTICLE_CONTENT'

function articleInMemory (getState, key, title) {
  let article = getState().articles[title]
  return article && article[key]
}

export function changeArticle (title, full) {
  return (dispatch, getState) => {
    dispatch({type: CHANGE_ARTICLE, title, full})
    let prop = full ? 'content' : 'summary'
    let apiCall = full ? api.full : api.lead
    let actionType = full ? ARTICLE_CONTENT : ARTICLE_SUMMARY
    if (!articleInMemory(getState, prop, title)) {
      return apiCall(title)
        .then((response) =>
          dispatch({
            type: actionType,
            title,
            [prop]: response
          }))
    }
  }
}
