import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Article from '../../components/article'
import CaptureClicks from '../../components/capture-clicks'
import { changeArticle, expandArticle } from '../../actions.js'

const ArticleContainer = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    article: React.PropTypes.object,
    history: React.PropTypes.object,
    changeArticle: React.PropTypes.func,
    expandArticle: React.PropTypes.func
  },
  render () {
    let {article, history, params, expandArticle} = this.props
    return (!article ? null
      : <CaptureClicks history={history}>
          <Article {...article} onExpand={() => expandArticle(params.title)}/>
        </CaptureClicks>)
  },
  statics: {
    fetchData (store, { location, params }) {
      let full = location.query && (location.query.full !== undefined)
      return store.dispatch(changeArticle(params.title, full))
    }
  },
  loadArticle (title) {
    const {changeArticle, expandArticle} = this.props
    changeArticle(title).then(() =>
      // Automatically trigger to get the full article loaded
      expandArticle(title))
  },
  componentDidMount () {
    this.loadArticle(this.props.params.title)
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.params.title !== this.props.params.title) {
      this.loadArticle(nextProps.params.title)
    }
  }
})

function selectArticle ({selectedArticle, articles}) {
  // If there is no selectedArticle just send null to not render
  if (!selectedArticle) return { article: null }
  let article = articles[selectedArticle] || {}
  // If the article is not in memory we'll send the title to start rendering
  return { article: { title: selectedArticle, ...article } }
}

function selectActions (dispatch) {
  return bindActionCreators({ changeArticle, expandArticle }, dispatch)
}

export default connect(selectArticle, selectActions)(ArticleContainer)
