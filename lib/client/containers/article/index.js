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
    return (
      <CaptureClicks history={history}>
        <Article {...article} onExpand={this.expandArticle}/>
      </CaptureClicks>
    )
  },
  statics: {
    fetchData (store, { location, params }) {
      let full = location.query && (location.query.full !== undefined)
      return store.dispatch(changeArticle(params.title, full))
    }
  },
  componentDidMount () {
    const {dispatch, params} = this.props
    dispatch(changeArticle(params.title))
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.params.title !== this.props.params.title) {
      const {dispatch, params} = nextProps
      dispatch(changeArticle(params.title))
    }
  },
  expandArticle () {
    const {dispatch, params} = this.props
    dispatch(expandArticle(params.title))
  }
})

function selectArticle ({selectedArticle, articles}) {
  let article = articles[selectedArticle] || {}
  return { article: { title: selectedArticle, ...article } }
}

export default connect(selectArticle)(ArticleContainer)
