import React from 'react'
import {findDOMNode} from 'react-dom'
import throttle from 'lodash.throttle'

const THRESHOLD_DEFAULT = 500

export default React.createClass({
  propTypes: {
    threshold: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
  },
  render () {
    return (
      <div className='LazyImages'>
        {this.props.children}
      </div>
    )
  },
  componentDidMount () {
    // Throttle the function that will be bound to the scroll & resize events
    this.__onViewportChange = throttle(this.onViewportChange, THRESHOLD_DEFAULT)
    window.addEventListener('scroll', this.__onViewportChange, true)
    window.addEventListener('resize', this.__onViewportChange, true)
    this.__onViewportChange()
  },
  componentDidUpdate () {
    this.__onViewportChange()
  },
  componentWillUnmount () {
    window.removeEventListener('scroll', this.__onViewportChange)
    window.removeEventListener('resize', this.__onViewportChange)
  },
  onViewportChange () {
    if (this.isMounted()) {
      window.requestAnimationFrame(() => {
        const images = findDOMNode(this).querySelectorAll('img[data-src]')
        const threshold = this.props.threshold || 200
        const innerHeight = window.innerHeight

        Array.prototype.slice.call(images).forEach((image) => {
          let bounds = image.getBoundingClientRect()
          if (
            // Bottom border is inside viewport from above
            bounds.top + bounds.height > -threshold &&
            // Top border is inside viewport from below
            bounds.top - threshold < innerHeight
          ) {
            // Image is visible. Transform it.
            window.requestAnimationFrame(() => {
              transformFakeImage(image)
            })
          }
        })
      })
    }
  }
})

function transformFakeImage (image) {
  image.setAttribute('src', image.dataset.src)
  image.setAttribute('srcset', image.dataset.srcset)
  image.removeAttribute('data-src')
  image.removeAttribute('data-srcset')
}
