import React from 'react'
import Toast from '../toast'

import './toasts.less'

export default React.createClass({
  propTypes: {
    toasts: React.PropTypes.array
  },
  render () {
    let { toasts } = this.props
    return <div className='Toasts'>
      { toasts.map((toast) => <Toast key={toast.text} {...toast} />) }
    </div>
  }
})
