import React from 'react'
import { connect } from 'react-redux'
import Article from '../../components/article'
import { changeFullArticle } from '../../actions.js'

const ArticleContainer = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    content: React.PropTypes.string
  },
  render () {
    let {params, content} = this.props
    return <Article title={params.title} content={content} />
  },
  statics: {
    fetchData (store, params) {
      return store.dispatch(changeFullArticle(params.title))
    }
  }
})

function selectArticle ({selectedArticle, articles}) {
  return {
    content: articles[selectedArticle].content
  }
}

export default connect(selectArticle)(ArticleContainer)
