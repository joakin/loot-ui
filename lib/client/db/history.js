import st from './storage'
import {key as articleKey} from './article'

export function get () {
  return st.keys().then((ks) =>
    ks.filter((x) => x.indexOf(articleKey('')) === 0)
      .map((x) => x.replace(articleKey(''), '')))
}
