import React from 'react'

// Placeholder for the server, which will never capture clicks
let origin = ''
if (__CLIENT__)
  origin = window.location.origin

let internal = new RegExp(`^${origin}`)

export default React.createClass({
  propTypes: {
    history: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
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
