import React from 'react'
import { connect } from 'react-redux'
import ArticleSummary from '../../components/article-summary'
import CaptureClicks from '../../components/capture-clicks'
import { changeArticle } from '../../actions.js'

const ArticleSummaryContainer = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    lead: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    history: React.PropTypes.object
  },
  render () {
    let {params, lead, history} = this.props
    return (
      <CaptureClicks history={history}>
        <ArticleSummary title={params.title} lead={lead} />
      </CaptureClicks>
    )
  },
  statics: {
    fetchData (store, params) {
      return store.dispatch(changeArticle(params.title))
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
  }
})

function selectArticle ({selectedArticle, articles}) {
  return {
    lead: articles[selectedArticle] && articles[selectedArticle].summary
  }
}

export default connect(selectArticle)(ArticleSummaryContainer)
