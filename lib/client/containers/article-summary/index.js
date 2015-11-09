import React from 'react'
import { connect } from 'react-redux'
import ArticleSummary from '../../components/article-summary'
import { changeArticle } from '../../actions.js'

const ArticleSummaryContainer = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    lead: React.PropTypes.string
  },
  render () {
    let {params, lead} = this.props
    return <ArticleSummary title={params.title} lead={lead} />
  },
  statics: {
    fetchData (store, params) {
      return store.dispatch(changeArticle(params.title))
    }
  }
})

function selectArticle ({selectedArticle, articles}) {
  return {
    lead: articles[selectedArticle].summary
  }
}

export default connect(selectArticle)(ArticleSummaryContainer)
