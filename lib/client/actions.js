import api from './api'

export const CHANGE_ARTICLE = 'CHANGE_ARTICLE'
export const EXPAND_ARTICLE = 'EXPAND_ARTICLE'
export const ARTICLE_SUMMARY = 'ARTICLE_SUMMARY'
export const ARTICLE_CONTENT = 'ARTICLE_CONTENT'

export function fetchSummary (title) {
  return (dispatch, getState) => {
    return api.lead(title).then((doc) =>
      dispatch({ type: ARTICLE_SUMMARY, title, doc }))
  }
}

export function fetchContent (title) {
  return (dispatch, getState) => {
    return api.full(title).then((doc) =>
      dispatch({ type: ARTICLE_CONTENT, title, doc }))
  }
}

export function changeArticle (title, full) {
  return (dispatch, getState) => {
    dispatch({type: CHANGE_ARTICLE, title})
    // If we need the full article, go expand it
    if (full) {
      return dispatch(expandArticle(title))
    } else {
      // Else, go for the summary version
      let articleMem = getState().articles[title]
      // If never visited article or not fetched, fetch the summary
      if (!articleMem || !articleMem.doc) { return dispatch(fetchSummary(title)) }
    }
  }
}

export function expandArticle (title) {
  return (dispatch, getState) => {
    let articleMem = getState().articles[title]
    dispatch({type: EXPAND_ARTICLE, title})
    // If we don't have the full content, fetch it
    if (!articleMem || !(articleMem.full && articleMem.doc)) {
      return dispatch(fetchContent(title))
    }
  }
}
