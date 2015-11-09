import React from 'react'
import ArticleSummary from '../../components/article-summary'
import api from '../../api'

export default React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },
  render () {
    let {params} = this.props
    let article = {
      title: params.title,
      lead: params.data.articleSummary
    }
    return <ArticleSummary {...article} />
  },
  statics: {
    fetchData ({params}) {
      return api.lead(params.title)
        .then((d) => ['articleSummary', d])
    }
  }
})
