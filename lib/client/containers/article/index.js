import React from 'react'
import { connect } from 'react-redux'
import Article from '../../components/article'
import CaptureClicks from '../../components/capture-clicks'
import { changeFullArticle } from '../../actions.js'

const ArticleContainer = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    content: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    history: React.PropTypes.object
  },
  render () {
    let {params, content, history} = this.props
    return (
      <CaptureClicks history={history}>
        <Article title={params.title} content={content} />
      </CaptureClicks>
    )
  },
  statics: {
    fetchData (store, params) {
      return store.dispatch(changeFullArticle(params.title))
    }
  },
  componentDidMount () {
    const {dispatch, params} = this.props
    dispatch(changeFullArticle(params.title))
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.params.title !== this.props.params.title) {
      const {dispatch, params} = nextProps
      dispatch(changeFullArticle(params.title))
    }
  }
})

function selectArticle ({selectedArticle, articles}) {
  return {
    content: articles[selectedArticle].content
  }
}

export default connect(selectArticle)(ArticleContainer)
