import st from './storage'

function key (title) { return `article-${title}` }

export function get (title) {
  return st.getItem(key(title))
}

export function set (title, article) {
  return st.setItem(key(title), article)
}
