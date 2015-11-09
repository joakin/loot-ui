import React from 'react'

var internal = new RegExp(`^${location.origin}`)

export default React.createClass({
  propTypes: {
    history: React.PropTypes.object,
    children: React.PropTypes.object
  },
  render () {
    return (
      <div className='CaptureClicks' onClick={this.click}>
        {this.props.children}
      </div>
    )
  },
  click (e) {
    let isInternal = internal.test(e.target.href)
    if (isInternal) {
      e.preventDefault()
      this.props.history.pushState(null, e.target.href)
    }
  }
})
