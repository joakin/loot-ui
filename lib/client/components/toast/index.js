import React from 'react'

import './toast.less'

export default React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },
  render () {
    let { text } = this.props
    return (
      <div className='Toast'>{ text }</div>
    )
  }
})
