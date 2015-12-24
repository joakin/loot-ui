import React from 'react'
import { connect } from 'react-redux'
import Article from '../../components/article'
import CaptureClicks from '../../components/capture-clicks'
import { changeArticle, expandArticle } from '../../actions.js'

const ArticleContainer = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    article: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    history: React.PropTypes.object
  },
  render () {
    let {article, history} = this.props
    return (!article ? null
      : <CaptureClicks history={history}>
          <Article {...article} onExpand={this.expandArticle}/>
        </CaptureClicks>)
  },
  statics: {
    fetchData (store, { location, params }) {
      let full = location.query && (location.query.full !== undefined)
      return store.dispatch(changeArticle(params.title, full))
    }
  },
  changeArticle (title) {
    const {dispatch} = this.props
    dispatch(changeArticle(title)).then(() =>
      // Automatically trigger to get the full article loaded
      dispatch(expandArticle(title)))
  },
  componentDidMount () {
    this.changeArticle(this.props.params.title)
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.params.title !== this.props.params.title) {
      this.changeArticle(nextProps.params.title)
    }
  },
  expandArticle () {
    const {dispatch, params} = this.props
    dispatch(expandArticle(params.title))
  }
})

function selectArticle ({selectedArticle, articles}) {
  // If there is no selectedArticle just send null to not render
  if (!selectedArticle) return { article: null }
  let article = articles[selectedArticle] || {}
  // If the article is not in memory we'll send the title to start rendering
  return { article: { title: selectedArticle, ...article } }
}

export default connect(selectArticle)(ArticleContainer)
