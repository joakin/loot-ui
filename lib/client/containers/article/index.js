import React from 'react'
import { connect } from 'react-redux'
import Article from '../../components/article'
import CaptureClicks from '../../components/capture-clicks'
import { changeArticle } from '../../actions.js'

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
      return store.dispatch(changeArticle(params.title, true))
    }
  },
  componentDidMount () {
    const {dispatch, params} = this.props
    dispatch(changeArticle(params.title, true))
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.params.title !== this.props.params.title) {
      const {dispatch, params} = nextProps
      dispatch(changeArticle(params.title, true))
    }
  }
})

function selectArticle ({selectedArticle, articles}) {
  return {
    content: articles[selectedArticle.title] && articles[selectedArticle.title].content
  }
}

export default connect(selectArticle)(ArticleContainer)
