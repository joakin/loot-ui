import React from 'react'
import Article from '../../components/article'
import api from '../../api'

export default React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },
  render () {
    let {params} = this.props
    let article = {
      title: params.title,
      content: params.data.article
    }
    return <Article {...article} />
  },
  statics: {
    fetchData ({params}) {
      return api.full(params.title)
        .then((d) => ['article', d])
    }
  }
})
